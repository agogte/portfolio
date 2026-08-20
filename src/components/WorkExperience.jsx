import React, { useState } from "react";
import WorkExperienceDataset from "../assets/data/WorkExperienceDataset";
import { Section, SectionHead, Reveal } from "./Signal";

const roles = WorkExperienceDataset.slice().reverse();

/**
 * Roles are shown one at a time. Stacking all three ran to twice the height of
 * a screen, and the current role carries six highlights on its own — a
 * selector keeps the whole history inside one view without cutting content.
 */
const WorkExperience = () => {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <Section name="WorkExperience">
      <SectionHead
        eyebrow="Experience"
        title="Where the systems ran."
        className="mb-8 md:mb-10"
      />

      <div className="grid gap-8 md:grid-cols-[260px_1fr] md:gap-14">
        {/* Role selector */}
        <div
          role="tablist"
          aria-label="Roles"
          className="flex gap-2 overflow-x-auto border-line pb-2 md:flex-col md:gap-0 md:overflow-visible md:border-l md:pb-0"
        >
          {roles.map((r, i) => {
            const on = i === active;
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                id={`role-tab-${r.id}`}
                aria-selected={on}
                aria-controls={`role-panel-${r.id}`}
                onClick={() => setActive(i)}
                className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-left transition-colors md:whitespace-normal md:border-b-0 md:border-l-2 md:-ml-[2px] md:px-4 md:py-3 ${
                  on
                    ? "border-accent text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <span className="block text-[14px] font-semibold leading-snug">
                  {r.company}
                </span>
                <span className="sg-eyebrow mt-1 block">
                  {r.fromDate} — {r.toDate}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected role */}
        <div
          role="tabpanel"
          id={`role-panel-${role.id}`}
          aria-labelledby={`role-tab-${role.id}`}
        >
          <Reveal key={role.id}>
            <h3 className="text-[22px] font-extrabold leading-tight tracking-tightest md:text-[28px]">
              {role.title}
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              {role.company} · {role.location}
            </p>

            <ul className="mt-6 space-y-3">
              {role.highlights.map((point, idx) => (
                <li
                  key={idx}
                  className="grid grid-cols-[auto_1fr] gap-4 text-[15px] leading-[1.55] text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-px w-5 shrink-0 bg-accent"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
