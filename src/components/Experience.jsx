import React from "react";

const Experience = () => {
  const categories = [
    {
      label: "Languages",
      color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
      skills: ["Java", "TypeScript", "Python", "Go", "C# (.NET 8)", "Node.js"],
    },
    {
      label: "Cloud & Infrastructure",
      color: "text-orange-400 border-orange-400/30 bg-orange-400/10",
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
      color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
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
      color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
      skills: ["React", "Angular 17 (NgRx)", "Next.js", "HTML5 / CSS3"],
    },
    {
      label: "Architecture & Practices",
      color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
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

  return (
    <div
      name="Experience"
      className="w-full h-auto py-16 bg-gradient-to-b to-gray-800 from-black text-white"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full">
        <div className="text-center mb-12">
          <p className="text-5xl font-bold inline border-b-4 border-gray-500">
            Tech Stack
          </p>
          <p className="mt-6 text-gray-400">
            Technologies I use to build scalable, reliable systems
          </p>
        </div>

        <div className="space-y-8">
          {categories.map(({ label, color, skills }) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${color}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
