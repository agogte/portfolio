const RESEND_URL = "https://api.resend.com/emails";
const MAX_ATTEMPTS = 3;

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

const corsHeaders = (origin, env) => {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim());
  if (!origin || !allowed.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
};

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Returns the cleaned fields, or a string describing the first problem.
export const validate = (body) => {
  if (!body || typeof body !== "object") return "Invalid request.";

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) return "Please fill in every field.";
  if (name.length > LIMITS.name) return "Name is too long.";
  if (email.length > LIMITS.email || !EMAIL.test(email))
    return "Please enter a valid email address.";
  if (message.length > LIMITS.message) return "Message is too long.";

  // Line breaks could be used to inject email headers.
  if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) return "Invalid request.";

  return { name, email, message };
};

// Same submission, same key, so a double submit sends one email.
const idempotencyKey = async ({ name, email, message }) => {
  const bytes = new TextEncoder().encode(`${name}\n${email}\n${message}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `contact-${hex.slice(0, 48)}`;
};

const buildEmail = ({ name, email, message }, env) => ({
  from: env.FROM_EMAIL,
  to: [env.TO_EMAIL],
  reply_to: email,
  subject: `Portfolio message from ${name}`,
  text: `${message}\n\nFrom: ${name} <${email}>`,
  html:
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` +
    `<p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryDelay = (response, attempt) => {
  const header = response && Number(response.headers.get("retry-after"));
  if (header > 0) return Math.min(header * 1000, 5000);
  return 250 * 2 ** attempt;
};

export const sendEmail = async (payload, key, env, { sleep = wait } = {}) => {
  let lastError = "send failed";

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    let response;
    try {
      response = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": key,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      lastError = String(error);
      if (attempt < MAX_ATTEMPTS - 1) await sleep(retryDelay(null, attempt));
      continue;
    }

    if (response.ok) return { ok: true, id: (await response.json()).id };

    lastError = `resend ${response.status}: ${await response.text()}`;
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable) break;
    if (attempt < MAX_ATTEMPTS - 1) await sleep(retryDelay(response, attempt));
  }

  return { ok: false, error: lastError };
};

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request.headers.get("Origin"), env);

    if (request.method === "OPTIONS") {
      return cors
        ? new Response(null, { status: 204, headers: cors })
        : new Response(null, { status: 403 });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, { Allow: "POST, OPTIONS" });
    }
    if (!cors) return json({ error: "Origin not allowed." }, 403);

    if (env.CONTACT_LIMIT) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const { success } = await env.CONTACT_LIMIT.limit({ key: ip });
      if (!success) {
        return json({ error: "Too many messages. Try again in a minute." }, 429, cors);
      }
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid request." }, 400, cors);
    }

    // Honeypot hit: report success so bots get no signal.
    if (body && body.website) return json({ ok: true }, 200, cors);

    const fields = validate(body);
    if (typeof fields === "string") return json({ error: fields }, 400, cors);

    const result = await sendEmail(
      buildEmail(fields, env),
      await idempotencyKey(fields),
      env
    );

    if (!result.ok) {
      console.error(result.error);
      return json({ error: "Could not send right now." }, 502, cors);
    }
    return json({ ok: true }, 200, cors);
  },
};
