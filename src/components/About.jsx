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
            I’m a Software Development Engineer with 3+ years of enterprise
            experience designing, building, and operating cloud-native,
            distributed systems. My work focuses on event-driven microservices,
            asynchronous processing, and production-grade infrastructure that
            scales reliably under real-world load.
          </p>

          <p>
            I’ve owned systems end-to-end — from architecture and implementation
            to CI/CD, deployment strategies, and on-call readiness — delivering
            measurable impact such as 40% throughput improvements, 35% latency
            reduction, and sustained 99.99% uptime. I primarily work with C#,
            Java, AWS, Azure, and modern DevOps pipelines to build resilient,
            maintainable platforms.
          </p>

          <p>
            I care deeply about engineering quality, system reliability, and
            long-term maintainability. I enjoy solving complex distributed
            systems problems, mentoring engineers through thoughtful code
            reviews, and building software that balances technical excellence
            with business outcomes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
