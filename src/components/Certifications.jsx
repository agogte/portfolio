import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";
import { ArrowUpRight } from "./Icons";

const certifications = [
  {
    name: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    skills: ["Model Context Protocol"],
    href: "https://verify.skilljar.com/c/ezri6kfx4v9n",
  },
  {
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    skills: ["Model Context Protocol"],
    href: "https://verify.skilljar.com/c/27ug4486qjt7",
  },
  {
    name: "Azure Fundamentals",
    issuer: "Microsoft",
    skills: ["Azure", "Cloud Architecture"],
    credentialId: "63B44B5DA12A1C32",
    href: "https://learn.microsoft.com/en-us/users/advaitgogte-7556/credentials/63b44b5da12a1c32",
  },
  {
    name: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    skills: ["Deep Learning", "ML Foundations"],
    credentialId: "ZNAJLMXT4HPL",
    href: "https://coursera.org/share/709c79d63e575680d452be74fed86228",
  },
  {
    name: "Redis for JavaScript Developers",
    issuer: "Redis",
    skills: ["Redis", "Cache Management"],
    credentialId: "54wbbfdphlvofv",
    href: "https://university.redis.io/certificate/54wbbfdphlvofv",
  },
];

const Certifications = () => (
  <Section name="Certifications">
    <SectionHead
      eyebrow="Certifications"
      title="Verified, and still relevant."
      note="Ordered by how much the credential actually counts for backend and platform work right now."
    />

    <ol className="m-0 list-none p-0">
      {certifications.map(({ name, issuer, skills, href, credentialId }, i) => {
        const Tag = href ? "a" : "div";
        const link = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
        return (
        <Reveal as="li" key={name} delay={i * 40}>
          <Tag
            {...link}
            className="row group grid grid-cols-[32px_1fr_auto] items-center gap-x-4 py-4 md:grid-cols-[32px_1fr_auto_auto] md:gap-x-8"
          >
            <span className="footnote font-mono tabular-nums text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <h3 className="headline">{name}</h3>
              <p className="footnote mt-0.5 text-ink-2">{issuer}</p>
            </div>

            <p className="footnote hidden text-ink-3 lg:block">{skills.join(" · ")}</p>

            {href ? (
              <span className="footnote flex items-center gap-1 whitespace-nowrap text-ink-2 transition-colors group-hover:text-accent">
                Verify
                <ArrowUpRight size={12} className="nudge" />
              </span>
            ) : (
              <span className="footnote whitespace-nowrap font-mono text-ink-3">
                ID {credentialId}
              </span>
            )}
          </Tag>
        </Reveal>
        );
      })}
    </ol>
  </Section>
);

export default Certifications;
