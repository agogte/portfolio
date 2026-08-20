import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
    return "system";
  }
};

export const ThemeProvider = ({ children }) => {
  const [choice, setChoice] = useState(readStored);
  const [systemDark, setSystemDark] = useState(prefersDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isDark = choice === "system" ? systemDark : choice === "dark";

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
    }
  }, [choice]);

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
