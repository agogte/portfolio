import React from "react";
import HeroImage from "../assets/IMG_8031.jpeg";
import { Section, SectionHead, Reveal } from "./Signal";

const facts = [
  { k: "Now", v: "Software Engineer II, IBEW — Washington, DC" },
  { k: "Core", v: "Java · TypeScript · Go · C#/.NET 8" },
  { k: "Cloud", v: "AWS · Azure · Kubernetes" },
  { k: "Since", v: "3+ years in production systems" },
];

const About = () => (
  <Section name="About">
    {/* Heading sits inside the left column so the portrait rises to meet it,
        keeping the whole section within one screen. */}
    <div className="grid gap-10 md:grid-cols-[1.35fr_.65fr] md:gap-14">
      <div>
        <SectionHead
          eyebrow="About"
          title="Ownership, end to end."
          className="mb-7 md:mb-9"
        />

        <Reveal className="space-y-5 text-[16px] leading-[1.7] text-muted">
          <p>
            I design and operate distributed systems at scale — event-driven
            microservices, high-throughput APIs, ETL/ELT pipelines, and
            AI-integrated backend systems built to handle real production load.
          </p>
          <p>
            I&rsquo;ve owned systems end-to-end: architecture, implementation,
            CI/CD, observability, and on-call readiness. That ownership turned
            into a{" "}
            <span className="font-semibold text-ink">
              40% throughput increase
            </span>
            ,{" "}
            <span className="font-semibold text-ink">35% latency reduction</span>
            ,{" "}
            <span className="font-semibold text-ink">55% MTTR improvement</span>,
            and sustained{" "}
            <span className="font-semibold text-ink">99.99% uptime</span> across
            mission-critical services.
          </p>
          <p>
            I care about engineering judgment, not just execution — hard
            distributed systems problems, AI tooling that earns its place in
            real workflows, and platforms that balance technical rigour with
            outcomes the business can actually feel.
          </p>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <img
          src={HeroImage}
          alt="Advait Gogte"
          className="aspect-[4/5] w-full object-cover"
        />
        <dl className="mt-6 border-t border-line">
          {facts.map(({ k, v }) => (
            <div key={k} className="flex gap-5 border-b border-line py-3">
              <dt className="sg-eyebrow w-14 shrink-0 pt-0.5">{k}</dt>
              <dd className="text-[14px] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </Section>
);

export default About;
