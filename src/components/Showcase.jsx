import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";
import { ArrowUpRight } from "./Icons";
import featureFlagService from "../assets/portfolio/feature-flag.svg";
import garminMcp from "../assets/portfolio/garmin-mcp.svg";

const second = {
  src: garminMcp,
  title: "garmin-mcp",
  blurb:
    "A local-first MCP server that lets an AI assistant read Garmin activities, sleep and HRV, and build interval workouts that sync to your watch. The password is never stored, there is no backend or telemetry, and CI enforces the network boundary.",
  stack: ["Python", "MCP", "uv", "pyright"],
  href: "https://github.com/agogte/garmin_mcp",
};

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

    <Reveal className="card p-8 md:p-12">
      <div className="grid gap-12 md:grid-cols-[1.15fr_.85fr] md:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <img src={showcase.src} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="label">Go · open source</span>
          </div>

          <h3 className="title-1 mt-8">{showcase.title}</h3>

          <p className="mt-4 max-w-[52ch] text-ink-2">{showcase.blurb}</p>

          <ul className="footnote mt-6 flex flex-wrap gap-x-4 gap-y-1 text-ink-3">
            {showcase.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <a
            href={showcase.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10"
          >
            Read the source
          </a>
        </div>

        <dl className="divide-y divide-line self-start">
          {showcase.capabilities.map(([term, detail]) => (
            <div key={term} className="py-4 first:pt-0 last:pb-0">
              <dt className="callout font-semibold">{term}</dt>
              <dd className="callout mt-1 text-ink-2">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>

    <Reveal delay={80} className="mt-10">
      <a
        href={second.href}
        target="_blank"
        rel="noopener noreferrer"
        className="row group grid gap-4 py-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6"
      >
        <img src={second.src} alt="" width={40} height={40} className="h-10 w-10 object-contain" />

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="title-3">{second.title}</h3>
            <p className="footnote text-ink-3">{second.stack.join(" · ")}</p>
          </div>
          <p className="callout mt-1 max-w-[72ch] text-ink-2">{second.blurb}</p>
        </div>

        <ArrowUpRight size={16} className="nudge hidden text-ink-3 md:block" />
      </a>
    </Reveal>
  </Section>
);

export default Showcase;
