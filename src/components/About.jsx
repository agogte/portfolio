import React from "react";

const About = () => {
  return (
    <div
      name="About"
      className="w-full h-screen py-8 md:h-screen md:py-20 bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>

        <div className="text-lg leading-relaxed space-y-6 text-gray-300 mt-12">
          <p>
            I’m a Software Engineer with 3+ years of experience designing and
            operating distributed systems at scale. My work spans event-driven
            microservices, high-throughput APIs, ETL/ELT pipelines, and
            AI-integrated backend systems — built to handle real production load
            reliably.
          </p>

          <p>
            I’ve owned systems end-to-end: architecture, implementation, CI/CD,
            observability, and on-call readiness. That ownership has translated
            into a 40% throughput increase, 35% latency reduction, 55% MTTR
            improvement, and sustained 99.99% uptime across mission-critical
            services. I work primarily in Java, TypeScript, C#, AWS, and Azure.
          </p>

          <p>
            I care about engineering judgment, not just execution. I enjoy
            solving hard distributed systems problems, integrating AI tooling
            into real workflows, and building platforms that balance technical
            excellence with clear business outcomes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
