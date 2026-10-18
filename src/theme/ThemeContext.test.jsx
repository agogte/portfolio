import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const renderToggle = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

const isDark = () => document.documentElement.classList.contains("dark");

describe("theme toggle", () => {
  test("follows the system preference by default", () => {
    renderToggle();

    expect(isDark()).toBe(false);
    expect(screen.getByRole("button", { name: /auto theme/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  test("dark applies the class and is remembered", () => {
    renderToggle();
    fireEvent.click(screen.getByRole("button", { name: /dark theme/i }));

    expect(isDark()).toBe(true);
    expect(window.localStorage.getItem("ag-theme")).toBe("dark");
  });

  test("light removes the class and is remembered", () => {
    window.localStorage.setItem("ag-theme", "dark");
    renderToggle();
    expect(isDark()).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: /light theme/i }));

    expect(isDark()).toBe(false);
    expect(window.localStorage.getItem("ag-theme")).toBe("light");
  });

  test("auto clears the stored choice", () => {
    window.localStorage.setItem("ag-theme", "dark");
    renderToggle();

    fireEvent.click(screen.getByRole("button", { name: /auto theme/i }));

    expect(window.localStorage.getItem("ag-theme")).toBeNull();
  });

  test("restores a saved choice on load", () => {
    window.localStorage.setItem("ag-theme", "dark");
    renderToggle();

    expect(screen.getByRole("button", { name: /dark theme/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
