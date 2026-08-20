import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Three-state theme: "light", "dark", or "system".
 *
 * "system" is the default and follows the OS preference live — if the visitor
 * flips their laptop to dark at sunset, the site follows without a reload.
 * An explicit choice is remembered in localStorage and wins until they pick
 * "system" again.
 */

const STORAGE_KEY = "ag-theme";
const ThemeContext = createContext(null);

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const readStored = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    // Private mode / storage disabled — fall back to following the system.
    return "system";
  }
};

export const ThemeProvider = ({ children }) => {
  const [choice, setChoice] = useState(readStored);
  const [systemDark, setSystemDark] = useState(prefersDark);

  // Track the OS preference so "system" stays live.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isDark = choice === "system" ? systemDark : choice === "dark";

  // Reflect onto <html> so Tailwind's `dark:` variants and the CSS vars apply.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#08090B" : "#FAFAF8");
  }, [isDark]);

  useEffect(() => {
    try {
      if (choice === "system") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Nothing to do — the in-memory choice still applies for this visit.
    }
  }, [choice]);

  // Cycle light → dark → system, so the control works as a single button.
  const cycle = useCallback(() => {
    setChoice((c) => (c === "light" ? "dark" : c === "dark" ? "system" : "light"));
  }, []);

  const value = useMemo(
    () => ({ choice, setChoice, cycle, isDark }),
    [choice, cycle, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a ThemeProvider");
  return ctx;
};
