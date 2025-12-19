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
            Software Development Engineer with 3+ years of enterprise experience
            building and operating cloud-native, distributed systems at scale.
            Specialized in event-driven microservices, asynchronous processing,
            and CI/CD automation across AWS and Azure, using C# and Java.
          </p>

          <p className="py-2 text-gray-300 text-lg">
            Proven track record of delivering measurable impact — increasing
            system throughput by 40%, reducing latency by 35%, and maintaining
            99.99% uptime through resilient architecture, blue/green
            deployments, and end-to-end system ownership. Experienced in
            designing for reliability, scalability, and long-term
            maintainability in production environments.
          </p>

          <p className="pt-2 text-gray-400 text-sm">
            Recent work includes serverless microservices, async messaging
            pipelines, SQL performance optimization, and production-grade CI/CD
            systems.
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
