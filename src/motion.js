// Damped spring, mass 1, parameterised the way SwiftUI does it: `response`
// is the period in seconds of the undamped oscillation, `damping` is the
// damping fraction (1 = critically damped, < 1 overshoots).
export const spring = ({ response = 0.3, damping = 1 } = {}) => {
  const stiffness = ((2 * Math.PI) / response) ** 2;
  const friction = (4 * Math.PI * damping) / response;
  return { stiffness, friction };
};

export const SNAPPY = spring({ response: 0.26, damping: 1 });
export const BOUNCY = spring({ response: 0.3, damping: 0.72 });

// Advances { value, velocity } towards `target` by `dt` seconds. Sub-steps
// keep semi-implicit Euler stable when a frame runs long.
export const step = (state, target, dt, { stiffness, friction }) => {
  let { value, velocity } = state;
  const n = Math.max(1, Math.ceil(dt / (1 / 240)));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    velocity += (-stiffness * (value - target) - friction * velocity) * h;
    value += velocity * h;
  }
  return { value, velocity };
};

export const atRest = ({ value, velocity }, target, epsilon = 0.001) =>
  Math.abs(value - target) < epsilon && Math.abs(velocity) < epsilon * 10;

// Runs a spring on requestAnimationFrame. Calling `to` mid-flight keeps the
// current velocity, so a new target redirects the motion instead of
// restarting it.
export const createSpring = (initial, onUpdate, params = SNAPPY) => {
  let state = { value: initial, velocity: 0 };
  let target = initial;
  let raf = 0;
  let last = 0;

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    state = step(state, target, dt, params);
    if (atRest(state, target, Math.max(Math.abs(target), 1) * 0.0005)) {
      state = { value: target, velocity: 0 };
      onUpdate(target);
      raf = 0;
      return;
    }
    onUpdate(state.value);
    raf = requestAnimationFrame(frame);
  };

  return {
    to(next, { velocity } = {}) {
      target = next;
      if (velocity !== undefined) state = { ...state, velocity };
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    set(value) {
      cancelAnimationFrame(raf);
      raf = 0;
      state = { value, velocity: 0 };
      target = value;
      onUpdate(value);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
    get value() {
      return state.value;
    },
  };
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
