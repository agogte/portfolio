import { spring, step, atRest, SNAPPY, BOUNCY } from "./motion";

const settle = (params, frames = 600) => {
  let state = { value: 0, velocity: 0 };
  let peak = 0;
  let settledAt = null;
  for (let i = 1; i <= frames; i++) {
    state = step(state, 1, 1 / 120, params);
    peak = Math.max(peak, state.value);
    if (settledAt === null && Math.abs(1 - state.value) < 0.01) settledAt = i / 120;
  }
  return { state, peak, settledAt };
};

describe("spring", () => {
  test("maps response and damping to stiffness and friction", () => {
    const { stiffness, friction } = spring({ response: 1, damping: 1 });
    expect(stiffness).toBeCloseTo(4 * Math.PI ** 2);
    expect(friction).toBeCloseTo(4 * Math.PI);
  });

  test("critically damped never overshoots and lands inside 300ms", () => {
    const { state, peak, settledAt } = settle(SNAPPY);
    expect(peak).toBeLessThanOrEqual(1.0001);
    expect(settledAt).toBeLessThan(0.3);
    expect(atRest(state, 1)).toBe(true);
  });

  test("the bouncy spring overshoots a little, not a lot", () => {
    const { peak } = settle(BOUNCY);
    expect(peak).toBeGreaterThan(1.01);
    expect(peak).toBeLessThan(1.06);
  });

  test("keeps incoming velocity, so a retarget carries momentum", () => {
    const moving = step({ value: 0, velocity: 10 }, 0, 1 / 60, SNAPPY);
    expect(moving.value).toBeGreaterThan(0);
  });

  test("stays stable when a frame runs long", () => {
    const { value } = step({ value: 0, velocity: 0 }, 1, 0.5, SNAPPY);
    expect(Number.isFinite(value)).toBe(true);
    expect(value).toBeGreaterThan(0.9);
    expect(value).toBeLessThan(1.1);
  });
});
