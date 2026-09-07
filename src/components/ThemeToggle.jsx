import React from "react";
import { useTheme } from "../theme/ThemeContext";

const MODES = [
  { id: "light", label: "Light", glyph: "☀" },
  { id: "system", label: "Auto", glyph: "◐" },
  { id: "dark", label: "Dark", glyph: "☾" },
];

const ThemeToggle = () => {
  const { choice, selectTheme } = useTheme();

  // The wipe grows from the centre of whichever button was pressed.
  const handleSelect = (id) => (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    selectTheme(id, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="inline-flex items-center rounded-full border border-line p-0.5"
    >
      {MODES.map(({ id, label, glyph }) => {
        const active = choice === id;
        return (
          <button
            key={id}
            type="button"
            onClick={handleSelect(id)}
            aria-pressed={active}
            title={`${label} theme`}
            className={`rounded-full px-2.5 py-1 text-[12px] leading-none transition-colors duration-150 ${
              active
                ? "bg-ink text-ground"
                : "text-muted hover:text-ink"
            }`}
          >
            <span aria-hidden="true">{glyph}</span>
            <span className="sr-only">{label} theme</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
