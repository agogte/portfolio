import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";

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
      className="mb-8 md:mb-10"
    />

    <ol className="m-0 list-none border-t border-line p-0">
      {certifications.map(({ name, issuer, skills, href, credentialId }, i) => {
        const rank = String(i + 1).padStart(2, "0");

        const body = (
          <>
            <span className="font-mono text-[13px] font-medium tabular-nums text-accent">
              {rank}
            </span>

            <div className="min-w-0">
              <h3 className="text-[16px] font-extrabold leading-snug tracking-tightest md:text-[18px]">
                {name}
              </h3>
              <p className="mt-0.5 text-[13px] text-muted">{issuer}</p>
            </div>

            <ul className="hidden gap-3 lg:flex">
              {skills.map((s) => (
                <li key={s} className="sg-eyebrow whitespace-nowrap">
                  {s}
                </li>
              ))}
            </ul>

            {href ? (
              <span className="flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted transition-colors group-hover:text-accent">
                Verify
                <span aria-hidden="true">↗</span>
              </span>
            ) : (
              <span className="sg-eyebrow whitespace-nowrap">
                ID {credentialId}
              </span>
            )}
          </>
        );

        const shared =
          "grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 border-b border-line py-4 md:grid-cols-[auto_1fr_auto_auto] md:gap-x-8";

        return (
          <li key={name}>
            <Reveal delay={i * 60}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${shared} transition-colors hover:bg-ink/[0.03]`}
                >
                  {body}
                </a>
              ) : (
                <div className={shared}>{body}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ol>
  </Section>
);

export default Certifications;
