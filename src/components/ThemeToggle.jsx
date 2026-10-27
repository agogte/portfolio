import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeContext";
import { createSpring, prefersReducedMotion, BOUNCY } from "../motion";
import { Sun, Auto, Moon } from "./Icons";

const MODES = [
  { id: "light", label: "Light", Glyph: Sun },
  { id: "system", label: "Auto", Glyph: Auto },
  { id: "dark", label: "Dark", Glyph: Moon },
];

const SEGMENT = 28;
const MAX = SEGMENT * (MODES.length - 1);
// How far a flick carries the thumb past where the finger let go, in
// seconds of travel at release velocity.
const PROJECTION = 0.12;

const ThemeToggle = () => {
  const { choice, selectTheme } = useTheme();
  const thumbRef = useRef(null);
  const motionRef = useRef(null);
  const buttonsRef = useRef([]);
  const dragRef = useRef(null);
  // A drag that lands is not also a click on the segment under it.
  const suppressClickRef = useRef(false);

  const index = Math.max(
    0,
    MODES.findIndex((m) => m.id === choice)
  );

  useLayoutEffect(() => {
    const paint = (x) => {
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translateX(${x}px)`;
      }
    };
    motionRef.current = createSpring(index * SEGMENT, paint, BOUNCY);
    paint(index * SEGMENT);
    return () => motionRef.current.stop();
    // The spring is created once; later moves go through `to`.
  }, []);

  useEffect(() => {
    const motion = motionRef.current;
    if (!motion) return;
    if (prefersReducedMotion()) motion.set(index * SEGMENT);
    else motion.to(index * SEGMENT);
  }, [index]);

  const choose = (i) => {
    const rect = buttonsRef.current[i]?.getBoundingClientRect();
    selectTheme(
      MODES[i].id,
      rect && { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
  };

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    suppressClickRef.current = false;
    const start = motionRef.current.value;
    // Only the thumb itself is draggable, as on iOS.
    const box = event.currentTarget.getBoundingClientRect();
    const local = event.clientX - box.left - 3;
    if (local < start || local > start + SEGMENT) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      originX: event.clientX,
      start,
      moved: false,
      lastX: event.clientX,
      lastT: event.timeStamp,
      velocity: 0,
    };
    thumbRef.current?.classList.add("scale-[0.92]");
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.originX;
    if (!drag.moved && Math.abs(dx) < 3) return;
    drag.moved = true;

    const dt = Math.max((event.timeStamp - drag.lastT) / 1000, 1 / 240);
    drag.velocity = (event.clientX - drag.lastX) / dt;
    drag.lastX = event.clientX;
    drag.lastT = event.timeStamp;

    // Direct manipulation: the thumb sits exactly under the pointer, with a
    // little rubber-band resistance past either end.
    let x = drag.start + dx;
    if (x < 0) x = x / 3;
    if (x > MAX) x = MAX + (x - MAX) / 3;
    motionRef.current.set(x);
  };

  const endDrag = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    thumbRef.current?.classList.remove("scale-[0.92]");
    if (!drag || !drag.moved) return;

    const projected = motionRef.current.value + drag.velocity * PROJECTION;
    const next = Math.min(
      MODES.length - 1,
      Math.max(0, Math.round(projected / SEGMENT))
    );
    motionRef.current.to(next * SEGMENT, { velocity: drag.velocity });
    if (next !== index) choose(next);
    suppressClickRef.current = true;
  };

  return (
    <div
      role="group"
      aria-label="Colour theme"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative inline-flex touch-none select-none rounded-full bg-fill p-[3px]"
      style={{ boxShadow: "inset 0 0 0 0.5px var(--hairline)" }}
    >
      <span
        ref={thumbRef}
        aria-hidden="true"
        className="absolute left-[3px] top-[3px] h-[26px] w-7 rounded-full bg-surface transition-[scale] duration-200"
        style={{ boxShadow: "var(--shadow-1)" }}
      />
      {MODES.map(({ id, label, Glyph }, i) => {
        const active = i === index;
        return (
          <button
            key={id}
            ref={(el) => (buttonsRef.current[i] = el)}
            type="button"
            onClick={() => {
              if (suppressClickRef.current) {
                suppressClickRef.current = false;
                return;
              }
              if (!active) choose(i);
            }}
            aria-pressed={active}
            title={`${label} theme`}
            className={`relative z-10 grid h-[26px] w-7 place-items-center rounded-full transition-colors duration-200 ${
              active ? "text-ink" : "text-ink-3 hover:text-ink-2"
            }`}
          >
            <Glyph size={14} />
            <span className="sr-only">{label} theme</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
