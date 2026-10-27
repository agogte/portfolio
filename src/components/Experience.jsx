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

    <Reveal className="divide-y divide-line">
      {categories.map(({ label, skills }) => (
        <div
          key={label}
          className="grid gap-3 py-6 first:pt-0 md:grid-cols-[256px_1fr] md:gap-20"
        >
          <h3 className="label pt-1">{label}</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <li key={skill} className="callout text-ink-2">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Reveal>
  </Section>
);

export default Experience;
