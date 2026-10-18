const BUNDLE = /\/static\/js\/main\.([\w-]+)\.js/;
const RELOADED_FOR = "ag-reloaded-for";

export const runningBundle = (doc = document) => {
  for (const script of doc.scripts) {
    const match = script.src && script.src.match(BUNDLE);
    if (match) return match[1];
  }
  return null;
};

const readFlag = () => {
  try {
    return window.sessionStorage.getItem(RELOADED_FOR);
  } catch {
    return null;
  }
};

const writeFlag = (value) => {
  try {
    window.sessionStorage.setItem(RELOADED_FOR, value);
  } catch {}
};

export const checkForUpdate = ({
  running = runningBundle(),
  url = window.location.pathname,
  reload = () => window.location.reload(),
} = {}) => {
  if (!running) return Promise.resolve(false);

  return fetch(url, { cache: "reload", credentials: "same-origin" })
    .then((response) => (response.ok ? response.text() : ""))
    .then((html) => {
      const match = html.match(BUNDLE);
      const latest = match && match[1];
      if (!latest || latest === running) return false;
      if (readFlag() === latest) return false;

      writeFlag(latest);
      reload();
      return true;
    })
    .catch(() => false);
};

export const keepFresh = () => {
  if (!runningBundle()) return;

  let inFlight = false;
  const check = () => {
    if (inFlight) return;
    inFlight = true;
    checkForUpdate().then(() => {
      inFlight = false;
    });
  };

  check();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") check();
  });
};
