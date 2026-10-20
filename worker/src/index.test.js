import worker, { sendEmail, validate } from "./index";

const env = {
  RESEND_API_KEY: "re_test",
  FROM_EMAIL: "Portfolio Contact <onboarding@resend.dev>",
  TO_EMAIL: "me@example.com",
  ALLOWED_ORIGINS: "https://agogte.github.io,http://localhost:3000",
};

const ORIGIN = "https://agogte.github.io";
const good = { name: "Ada", email: "ada@example.com", message: "Hello there" };

const post = (body, origin = ORIGIN) =>
  new Request("https://contact.example.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(origin && { Origin: origin }) },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const jsonResponse = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers });

describe("contact worker", () => {
  const originalFetch = globalThis.fetch;
  let calls;

  const respondWith = (...responses) => {
    globalThis.fetch = (url, init) => {
      calls.push({ url, init });
      const next = responses.length > 1 ? responses.shift() : responses[0];
      return next instanceof Error ? Promise.reject(next) : Promise.resolve(next());
    };
  };

  beforeEach(() => {
    calls = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("sends a valid message to Resend with reply-to set to the visitor", async () => {
    respondWith(() => jsonResponse({ id: "email_1" }));

    const res = await worker.fetch(post(good), env);

    expect(res.status).toBe(200);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(ORIGIN);
    expect(calls).toHaveLength(1);

    const sent = JSON.parse(calls[0].init.body);
    expect(sent.to).toEqual(["me@example.com"]);
    expect(sent.reply_to).toBe("ada@example.com");
    expect(sent.subject).toBe("Portfolio message from Ada");
    expect(calls[0].init.headers.Authorization).toBe("Bearer re_test");
    expect(calls[0].init.headers["Idempotency-Key"]).toMatch(/^contact-[a-f0-9]{48}$/);
  });

  test("the same submission reuses the same idempotency key", async () => {
    respondWith(() => jsonResponse({ id: "email_1" }));

    await worker.fetch(post(good), env);
    await worker.fetch(post(good), env);
    await worker.fetch(post({ ...good, message: "Different" }), env);

    const keys = calls.map((c) => c.init.headers["Idempotency-Key"]);
    expect(keys[0]).toBe(keys[1]);
    expect(keys[2]).not.toBe(keys[0]);
  });

  test("escapes HTML so a message cannot inject markup", async () => {
    respondWith(() => jsonResponse({ id: "email_1" }));

    await worker.fetch(post({ ...good, message: '<img src=x onerror="alert(1)">' }), env);

    const { html } = JSON.parse(calls[0].init.body);
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });

  test("rejects other origins without calling Resend", async () => {
    respondWith(() => jsonResponse({ id: "email_1" }));

    const res = await worker.fetch(post(good, "https://evil.example"), env);

    expect(res.status).toBe(403);
    expect(calls).toHaveLength(0);
  });

  test("answers the CORS preflight for the site", async () => {
    const res = await worker.fetch(
      new Request("https://x/", { method: "OPTIONS", headers: { Origin: ORIGIN } }),
      env
    );

    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });

  test("silently drops honeypot submissions", async () => {
    respondWith(() => jsonResponse({ id: "email_1" }));

    const res = await worker.fetch(post({ ...good, website: "spam.biz" }), env);

    expect(res.status).toBe(200);
    expect(calls).toHaveLength(0);
  });

  test("returns 400 for bad input and malformed JSON", async () => {
    respondWith(() => jsonResponse({ id: "email_1" }));

    expect((await worker.fetch(post({ ...good, email: "nope" }), env)).status).toBe(400);
    expect((await worker.fetch(post("{not json"), env)).status).toBe(400);
    expect(calls).toHaveLength(0);
  });

  test("returns 429 when the visitor is rate limited", async () => {
    const limited = { ...env, CONTACT_LIMIT: { limit: async () => ({ success: false }) } };

    const res = await worker.fetch(post(good), limited);

    expect(res.status).toBe(429);
  });

  test("hides Resend errors from the visitor", async () => {
    respondWith(() => jsonResponse({ message: "invalid key" }, 401));
    const error = console.error;
    console.error = () => {};

    const res = await worker.fetch(post(good), env);
    console.error = error;

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "Could not send right now." });
  });
});

describe("validate", () => {
  test("trims and accepts a normal message", () => {
    expect(validate({ name: " Ada ", email: "ada@example.com", message: " hi " })).toEqual({
      name: "Ada",
      email: "ada@example.com",
      message: "hi",
    });
  });

  test("rejects line breaks in the name, which could forge headers", () => {
    expect(typeof validate({ ...good, name: "Ada\nBcc: x@y.z" })).toBe("string");
  });

  test("rejects oversized messages", () => {
    expect(typeof validate({ ...good, message: "a".repeat(5001) })).toBe("string");
  });
});

describe("sendEmail retries", () => {
  const originalFetch = globalThis.fetch;
  const sleep = async () => {};
  let attempts;

  const queue = (...responses) => {
    attempts = 0;
    globalThis.fetch = () => {
      const next = responses[Math.min(attempts, responses.length - 1)];
      attempts += 1;
      return next instanceof Error ? Promise.reject(next) : Promise.resolve(next());
    };
  };

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("retries 429 and 5xx, then succeeds", async () => {
    queue(
      () => jsonResponse({}, 429, { "retry-after": "1" }),
      () => jsonResponse({}, 503),
      () => jsonResponse({ id: "email_2" })
    );

    const result = await sendEmail({}, "k", env, { sleep });

    expect(result).toEqual({ ok: true, id: "email_2" });
    expect(attempts).toBe(3);
  });

  test("retries network errors", async () => {
    queue(new TypeError("network down"), () => jsonResponse({ id: "email_3" }));

    expect(await sendEmail({}, "k", env, { sleep })).toEqual({ ok: true, id: "email_3" });
  });

  test("does not retry a 4xx validation error", async () => {
    queue(() => jsonResponse({ message: "bad" }, 422));

    const result = await sendEmail({}, "k", env, { sleep });

    expect(result.ok).toBe(false);
    expect(attempts).toBe(1);
  });

  test("gives up after three attempts", async () => {
    queue(() => jsonResponse({}, 500));

    expect((await sendEmail({}, "k", env, { sleep })).ok).toBe(false);
    expect(attempts).toBe(3);
  });
});
