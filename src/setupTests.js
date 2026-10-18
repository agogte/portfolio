import "@testing-library/jest-dom";

// jsdom implements none of these browser APIs. Plain functions are used rather
// than jest.fn() because Create React App resets jest mocks between tests.

const makeMatchMedia = (matches = false) => (query) => ({
  matches,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
});

window.matchMedia = makeMatchMedia(false);
window.__makeMatchMedia = makeMatchMedia;

class NoopIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver = NoopIntersectionObserver;

// The hero canvas bails out cleanly when it cannot get a 2d context.
HTMLCanvasElement.prototype.getContext = () => null;

window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
});
