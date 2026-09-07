import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { flushSync } from "react-dom";

const STORAGE_KEY = "ag-theme";
const ThemeContext = createContext(null);

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const resolveDark = (next) => (next === "system" ? prefersDark() : next === "dark");

const paintTheme = (dark) => {
  document.documentElement.classList.toggle("dark", dark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#08090B" : "#FAFAF8");
};

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
    paintTheme(isDark);
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

  // Swaps the theme behind a circular wipe that grows from `origin`, the point
  // that was clicked. Falls back to an instant swap where the View Transitions
  // API is missing, motion is reduced, or no origin was supplied.
  const selectTheme = useCallback(
    (next, origin) => {
      if (next === choice) return;

      const canAnimate =
        typeof document.startViewTransition === "function" &&
        origin &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!canAnimate) {
        setChoice(next);
        return;
      }

      const nextDark = resolveDark(next);

      const transition = document.startViewTransition(() => {
        // The callback has to leave the DOM in its final state synchronously,
        // otherwise the transition snapshots the old theme twice.
        flushSync(() => setChoice(next));
        paintTheme(nextDark);
      });

      transition.ready
        .then(() => {
          const { x, y } = origin;
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          );

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 620,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
    },
    [choice]
  );

  const value = useMemo(
    () => ({ choice, setChoice, selectTheme, cycle, isDark }),
    [choice, selectTheme, cycle, isDark]
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
