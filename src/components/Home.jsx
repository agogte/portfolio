import React from "react";
import HeroImage from "../assets/IMG_8031.jpeg";
// import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

const Home = () => {
  return (
    <div
      name="Home"
      className="h-screen w-full md:h-screen bg-gradient-to-b from-black via-black to-gray-800 py-10 md:py-24"
    >
      <div className="max-w-screen-lg mx-auto flex flex-col  md:flex-row items-center px-4 justify-center h-full">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Software Engineer
          </h2>

          <p className="text-gray-400 text-sm uppercase tracking-widest mt-5">
            FullStack • Cloud Infrastructure • Event-Driven Architecture
          </p>

          <p className="py-4 text-gray-300 text-lg">
            Software Engineer with 3+ years of experience designing and
            operating distributed systems at scale. Proven track record of
            delivering measurable business impact through event-driven
            architectures, high-throughput APIs, and AI-integrated backend
            systems.
          </p>

          <p className="py-2 text-gray-300 text-lg">
            Deep expertise in Java, TypeScript, and cloud-native infrastructure
            across AWS and Azure. Known for strong engineering judgment,
            cross-functional ownership, and shipping reliable systems that serve
            millions of users.
          </p>

          <p className="pt-2 text-gray-400 text-sm">
            Recent work spans event-driven microservices, ETL pipelines, SQL
            performance optimization, LLM-integrated tooling, and
            production-grade CI/CD systems.
          </p>
        </div>
        <div>
          <img
            src={HeroImage}
            alt="displaypicture"
            className="mx-auto md:w-2/3 w-2/3 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
