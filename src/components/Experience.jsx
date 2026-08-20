import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";

const categories = [
  {
    label: "Languages",
    skills: ["Java", "TypeScript", "Python", "Go", "C# (.NET 8)", "Node.js"],
  },
  {
    label: "Cloud & Infrastructure",
    skills: [
      "AWS (EC2, S3, Lambda, SQS, ECS/EKS, RDS, API Gateway)",
      "Azure (Functions, Web App, ACS, Blob)",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
      "Azure DevOps",
      "Jenkins",
      "IaC",
      "Blue/Green Deployments",
    ],
  },
  {
    label: "Messaging & Data",
    skills: [
      "Kafka",
      "RabbitMQ",
      "SQL Server",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "ETL/ELT Pipelines",
      "OAuth2 / JWT",
    ],
  },
  {
    label: "Frontend",
    skills: ["React", "Angular 17 (NgRx)", "Next.js", "HTML5 / CSS3"],
  },
  {
    label: "Architecture & Practices",
    skills: [
      "Microservices",
      "Event-Driven Architecture",
      "Distributed Systems",
      "REST APIs",
      "System Design",
      "LLM Integration",
      "Agile / Scrum",
    ],
  },
];

const Experience = () => (
  <Section name="Experience">
    <SectionHead
      eyebrow="Stack"
      title="What it's made of."
      note="Technologies I reach for to build scalable, reliable systems."
    />

    <div className="border-t border-line">
      {categories.map(({ label, skills }, i) => (
        <Reveal
          key={label}
          delay={i * 60}
          className="grid gap-3 border-b border-line py-5 md:grid-cols-[.28fr_.72fr] md:gap-10"
        >
          <h3 className="sg-eyebrow pt-1">{label}</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
            {skills.map((skill) => (
              <li
                key={skill}
                className="text-[15px] text-muted transition-colors hover:text-ink"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Experience;
