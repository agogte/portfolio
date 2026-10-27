import React, { useLayoutEffect, useRef, useState } from "react";
import WorkExperienceDataset from "../assets/data/WorkExperienceDataset";
import { Section, SectionHead, Reveal } from "./Signal";

const roles = WorkExperienceDataset.slice().reverse();

const WorkExperience = () => {
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState(null);
  const tabsRef = useRef([]);
  const role = roles[active];

  // One selection surface that travels between tabs. Its transition is a
  // spring on transform and size, so clicking again mid-flight redirects it.
  useLayoutEffect(() => {
    const measure = () => {
      const el = tabsRef.current[active];
      if (!el) return;
      setPill({
        x: el.offsetLeft,
        y: el.offsetTop,
        w: el.offsetWidth,
        h: el.offsetHeight,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (active + keys[event.key] + roles.length) % roles.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = roles.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <Section name="WorkExperience">
      <SectionHead eyebrow="Experience" title="Where the systems ran." />

      <Reveal className="grid gap-12 md:grid-cols-[256px_1fr] md:gap-20">
        <div
          role="tablist"
          aria-label="Roles"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="relative -mx-6 flex gap-1 overflow-x-auto px-6 md:mx-0 md:flex-col md:self-start md:overflow-visible md:px-0"
        >
          {pill && (
            <span
              aria-hidden="true"
              className="sq absolute left-0 top-0 bg-surface transition-[transform,width,height] duration-[var(--dur-snappy)]"
              style={{
                "--r": "12px",
                boxShadow: "var(--shadow-1)",
                width: pill.w,
                height: pill.h,
                transform: `translate(${pill.x}px, ${pill.y}px)`,
              }}
            />
          )}
          {roles.map((r, i) => {
            const on = i === active;
            return (
              <button
                key={r.id}
                ref={(el) => (tabsRef.current[i] = el)}
                type="button"
                role="tab"
                id={`role-tab-${r.id}`}
                aria-selected={on}
                aria-controls={`role-panel-${r.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`press relative shrink-0 whitespace-nowrap rounded-xl px-4 py-3 text-left md:whitespace-normal ${
                  on ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                <span className="callout block font-semibold">{r.company}</span>
                <span className="footnote mt-0.5 block text-ink-3 tabular-nums">
                  {r.fromDate} – {r.toDate}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`role-panel-${role.id}`}
          aria-labelledby={`role-tab-${role.id}`}
        >
          {/* A short crossfade, not a re-run of the scroll reveal: switching
              tabs should feel instant. */}
          <div key={role.id} className="fade-in">
            <h3 className="title-2">{role.title}</h3>
            <p className="callout mt-2 text-ink-2">
              {role.company} · {role.location}
            </p>

            <ul className="mt-10 max-w-[64ch] space-y-5">
              {role.highlights.map((point, idx) => (
                <li
                  key={idx}
                  className="grid grid-cols-[auto_1fr] gap-4 text-ink-2"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-ink-3"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
};

export default WorkExperience;
