import { checkForUpdate, runningBundle } from "./freshness";

const page = (hash) =>
  `<!doctype html><script defer="defer" src="/portfolio/static/js/main.${hash}.js"></script>`;

const respondWith = (body, ok = true) => {
  window.fetch = () => Promise.resolve({ ok, text: () => Promise.resolve(body) });
};

describe("freshness", () => {
  const originalFetch = window.fetch;
  let reloads;
  const reload = () => {
    reloads += 1;
  };

  beforeEach(() => {
    reloads = 0;
    window.sessionStorage.clear();
  });

  afterEach(() => {
    window.fetch = originalFetch;
    document.head.innerHTML = "";
  });

  test("reads the running bundle hash from the page", () => {
    document.head.innerHTML = page("abc123");
    expect(runningBundle()).toBe("abc123");
  });

  test("returns null on the dev server where nothing is hashed", () => {
    document.head.innerHTML = '<script src="/static/js/bundle.js"></script>';
    expect(runningBundle()).toBeNull();
  });

  test("reloads when the deployed page points at a newer bundle", async () => {
    respondWith(page("def456"));

    await expect(checkForUpdate({ running: "abc123", url: "/", reload })).resolves.toBe(true);
    expect(reloads).toBe(1);
  });

  test("does nothing when already on the latest bundle", async () => {
    respondWith(page("abc123"));

    await checkForUpdate({ running: "abc123", url: "/", reload });
    expect(reloads).toBe(0);
  });

  test("reloads only once per new version, so it cannot loop", async () => {
    respondWith(page("def456"));

    await checkForUpdate({ running: "abc123", url: "/", reload });
    await checkForUpdate({ running: "abc123", url: "/", reload });
    expect(reloads).toBe(1);
  });

  test("ignores failed or unreadable responses", async () => {
    respondWith(page("def456"), false);
    await checkForUpdate({ running: "abc123", url: "/", reload });

    window.fetch = () => Promise.reject(new Error("offline"));
    await checkForUpdate({ running: "abc123", url: "/", reload });

    respondWith("<html>no bundle here</html>");
    await checkForUpdate({ running: "abc123", url: "/", reload });

    expect(reloads).toBe(0);
  });

  test("skips the check entirely when no bundle is running", async () => {
    let fetched = false;
    window.fetch = () => {
      fetched = true;
      return Promise.resolve({ ok: true, text: () => Promise.resolve(page("x1")) });
    };

    await checkForUpdate({ running: null, url: "/", reload });
    expect(fetched).toBe(false);
  });
});
