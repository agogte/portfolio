import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";
import featureFlagService from "../assets/portfolio/feature-flag.svg";

const showcase = {
  src: featureFlagService,
  title: "Feature Flag Service",
  blurb:
    "A production-shaped feature flag platform written in Go. The evaluation engine resolves a flag for a given user through override lists, segment targeting, and sticky percentage rollouts. Sticky means the same user always lands on the same side of a 30% rollout, which is what makes gradual releases measurable instead of noisy.",
  capabilities: [
    ["Evaluation engine", "Override lists, segment rules, sticky % rollouts"],
    ["Persistence", "SQLite-backed flag store, seeded on first run"],
    ["Operability", "Health and metrics endpoints, eval + error counters"],
    ["Interface", "REST API with Swagger UI, plus a live demo client"],
  ],
  stack: ["Go", "SQLite", "Docker Compose", "Swagger"],
  href: "https://github.com/agogte/feature-flag-service",
};

const Showcase = () => (
  <Section name="showcase">
    <SectionHead eyebrow="Showcase" title="The one to read first." />

    <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:gap-16">
      <Reveal>
        <div className="flex items-center gap-3">
          <img src={showcase.src} alt="" className="h-9 w-9 object-contain" />
          <span className="sg-eyebrow">Go · open source</span>
        </div>

        <h3 className="sg-display mt-5 text-[clamp(1.9rem,4.5vw,3rem)]">
          {showcase.title}
        </h3>

        <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.7] text-muted">
          {showcase.blurb}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {showcase.stack.map((s) => (
            <li key={s} className="sg-eyebrow">
              {s}
            </li>
          ))}
        </ul>

        <a
          href={showcase.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block border border-ink bg-ink px-7 py-3.5 text-[14px] font-semibold text-ground transition-opacity hover:opacity-85"
        >
          Read the source
        </a>
      </Reveal>

      <Reveal delay={120}>
        <dl className="border-t border-line">
          {showcase.capabilities.map(([term, detail]) => (
            <div key={term} className="border-b border-line py-4">
              <dt className="text-[14px] font-semibold">{term}</dt>
              <dd className="mt-1 text-[14px] leading-snug text-muted">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </Section>
);

export default Showcase;
