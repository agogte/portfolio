import React from "react";
import HeroImage from "../assets/IMG_8031.jpeg";
import HeroImageSmall from "../assets/IMG_8031-450.jpeg";
import { Section, SectionHead, Reveal } from "./Signal";

const facts = [
  { k: "Now", v: "Software Engineer II, IBEW · Washington, DC" },
  { k: "Core", v: "Java · TypeScript · Go · C#/.NET 8" },
  { k: "Cloud", v: "AWS · Azure · Kubernetes" },
  { k: "Since", v: "4+ years in production systems" },
];

const About = () => (
  <Section name="About">

    <div className="grid gap-10 md:grid-cols-[1.35fr_.65fr] md:gap-14">
      <div>
        <SectionHead
          eyebrow="About"
          title="AI-first backend engineer."
          className="mb-7 md:mb-9"
        />

        <Reveal className="space-y-5 text-[16px] leading-[1.7] text-muted">
          <p>
            I build backend systems with AI in the loop from design to
            production. That means event-driven microservices, high-throughput
            APIs and data pipelines, connected to LLMs through MCP servers and
            automated tooling.
          </p>
          <p>
            At IBEW I brought LLM tooling into our engineering workflow for code
            review, test generation and design validation. Post-release defects
            fell{" "}
            <span className="font-semibold text-ink">25%</span> and review cycles
            got <span className="font-semibold text-ink">40% faster</span>. On my
            own time I build MCP servers like garmin-mcp.
          </p>
          <p>
            The backend work is what makes that AI usable in production. Owning a
            10k+ transaction platform end to end delivered a{" "}
            <span className="font-semibold text-ink">
              40% throughput increase
            </span>
            ,{" "}
            <span className="font-semibold text-ink">35% latency reduction</span>
            ,{" "}
            <span className="font-semibold text-ink">55% MTTR improvement</span>,
            and <span className="font-semibold text-ink">99.99% uptime</span>.
          </p>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <img
          src={HeroImage}
          srcSet={`${HeroImageSmall} 450w, ${HeroImage} 900w`}
          sizes="(min-width: 768px) 352px, 100vw"
          alt="Advait Gogte"
          width={900}
          height={1125}
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
