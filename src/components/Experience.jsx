import React from "react";
import angular from "../assets/Angular.png";
import bash from "../assets/bash.png";
import docker from "../assets/docker.png";
import git from "../assets/git.png";
import csharp from "../assets/csharp.png.svg";
import sqlserver from "../assets/sqlserver.png.jpg";
import jenkins from "../assets/jenkins.png";
import powershell from "../assets/powershell.png";
import azure from "../assets/azure.png";
import java from "../assets/java.png";
import react from "../assets/react.png";
import nodejs from "../assets/Nodejs.png";
import postgres from "../assets/PostgresSQL.png";
import aws from "../assets/AWS.png";
import rabbitmq from "../assets/RabbitMQ.png";

const Experience = () => {
  const tech = [
    { id: 1, src: csharp, title: "C#", style: "shadow-purple-500" },
    { id: 2, src: java, title: "Java", style: "shadow-red-500" },
    { id: 3, src: angular, title: "Angular", style: "shadow-pink-500" },
    { id: 4, src: react, title: "React", style: "shadow-cyan-500" },
    { id: 5, src: nodejs, title: "Node.js", style: "shadow-green-500" },
    { id: 6, src: sqlserver, title: "SQL Server", style: "shadow-blue-500" },
    { id: 7, src: postgres, title: "PostgreSQL", style: "shadow-blue-400" },
    { id: 8, src: aws, title: "AWS", style: "shadow-orange-400" },
    { id: 9, src: azure, title: "Azure", style: "shadow-blue-400" },
    { id: 10, src: docker, title: "Docker", style: "shadow-blue-600" },
    { id: 11, src: jenkins, title: "Jenkins", style: "shadow-red-500" },
    { id: 12, src: git, title: "Git", style: "shadow-orange-400" },
    { id: 13, src: bash, title: "Bash", style: "shadow-gray-400" },
    { id: 14, src: powershell, title: "PowerShell", style: "shadow-blue-300" },
    { id: 15, src: rabbitmq, title: "RabbitMQ", style: "shadow-red-400" },
  ];

  return (
    <div
      name="Experience"
      className="w-full h-auto md:h-screen py-16 bg-gradient-to-b to-gray-800 from-black text-white"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="text-center mb-12">
          <p className="text-5xl font-bold inline border-b-4 border-gray-500">
            Tech Stack
          </p>
          <p className="mt-6 text-gray-300">
            Key technologies I’ve worked with to build scalable, reliable
            systems
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {tech.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${style} shadow-md hover:scale-105 transition-transform duration-300`}
            >
              <img
                src={src}
                alt={title}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
              <p className="mt-2 text-sm md:text-base font-medium">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
