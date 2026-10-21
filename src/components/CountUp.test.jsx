import { render, screen } from "@testing-library/react";
import { CountUp } from "./Signal";

const shown = (container) => container.querySelector('[aria-hidden="true"]');

describe("CountUp", () => {
  const original = window.matchMedia;

  afterEach(() => {
    window.matchMedia = original;
  });

  test("shows the final value straight away when motion is reduced", () => {
    window.matchMedia = window.__makeMatchMedia(true);

    const { container } = render(<CountUp value="99.99%" />);

    expect(shown(container)).toHaveTextContent("99.99%");
  });

  test.each([
    ["+40%", "+40%"],
    ["−35%", "−35%"],
    ["15+", "15+"],
  ])("keeps the prefix and suffix of %s", (value, expected) => {
    window.matchMedia = window.__makeMatchMedia(true);

    const { container } = render(<CountUp value={value} />);

    expect(shown(container)).toHaveTextContent(expected);
  });

  test("renders non-numeric values untouched", () => {
    render(<CountUp value="n/a" />);

    expect(screen.getByText("n/a")).toBeInTheDocument();
  });

  test("starts at zero until it scrolls into view", () => {
    const { container } = render(<CountUp value="+40%" />);

    expect(shown(container)).toHaveTextContent("+0%");
  });

  test("screen readers always get the final value, never the animation", () => {
    const { container } = render(<CountUp value="+40%" />);

    expect(screen.getByText("+40%")).toHaveClass("sr-only");
    expect(container.querySelector("[aria-label]")).toBeNull();
  });
});
