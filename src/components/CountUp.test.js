import { render, screen } from "@testing-library/react";
import { CountUp } from "./Signal";

describe("CountUp", () => {
  const original = window.matchMedia;

  afterEach(() => {
    window.matchMedia = original;
  });

  test("shows the final value straight away when motion is reduced", () => {
    window.matchMedia = window.__makeMatchMedia(true);

    render(<CountUp value="99.99%" />);

    expect(screen.getByLabelText("99.99%")).toHaveTextContent("99.99%");
  });

  test.each([
    ["+40%", "+40%"],
    ["−35%", "−35%"],
    ["15+", "15+"],
  ])("keeps the prefix and suffix of %s", (value, expected) => {
    window.matchMedia = window.__makeMatchMedia(true);

    render(<CountUp value={value} />);

    expect(screen.getByLabelText(value)).toHaveTextContent(expected);
  });

  test("renders non-numeric values untouched", () => {
    render(<CountUp value="n/a" />);

    expect(screen.getByText("n/a")).toBeInTheDocument();
  });

  test("starts at zero until it scrolls into view", () => {
    render(<CountUp value="+40%" />);

    expect(screen.getByLabelText("+40%")).toHaveTextContent("+0%");
  });
});
