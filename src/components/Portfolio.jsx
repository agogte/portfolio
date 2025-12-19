import React from "react";
import utilynx from "../assets/portfolio/NPM.png";
import smartapigateway from "../assets/portfolio/smart-api.png";
import rabbitmqSample from "../assets/portfolio/queue.png";

import tictactoe from "../assets/portfolio/tictactoe.png";
import newssummarizer from "../assets/portfolio/newssummaizer.png";
import dadjokes from "../assets/portfolio/dadjokes.png";
import password_generator from "../assets/portfolio/password_generator.png";
import snake from "../assets/portfolio/snake.png";
import candycrush from "../assets/portfolio/candycrush.png";
import hangman from "../assets/portfolio/hangman.png";
import whowantstobeamillionair from "../assets/portfolio/whowantstobeamillionarie.png";
import urlshortener from "../assets/portfolio/url-shortener.png";

const Portfolio = () => {
  const topProjects = [
    {
      id: 1,
      src: utilynx,
      title: "utilynx (npm)",
      href: "https://www.npmjs.com/package/@agogte/utilynx",
    },
    {
      id: 2,
      src: smartapigateway,
      title: "Smart API Gateway",
      href: "https://github.com/agogte/smart-api-gateway",
    },
    {
      id: 3,
      src: rabbitmqSample,
      title: "RabbitMQ Sample",
      href: "https://github.com/agogte/rabbitmq-sample",
    },
  ];

  const otherProjects = [
    {
      id: 4,
      src: urlshortener,
      title: "Shorten IT!",
      href: "https://github.com/agogte/urlshortener",
    },
    {
      id: 5,
      src: newssummarizer,
      title: "News Article Summarizer",
      href: "https://agogte.github.io/newssummarizer/",
    },
    {
      id: 6,
      src: tictactoe,
      title: "Tic Tac Toe",
      href: "https://agogte.github.io/tic-tac-toe/",
    },
    {
      id: 7,
      src: dadjokes,
      title: "Dad Joke Generator",
      href: "https://agogte.github.io/dadjokes/",
    },
    {
      id: 8,
      src: password_generator,
      title: "Password Generator",
      href: "https://agogte.github.io/passgen_JS/",
    },
    {
      id: 9,
      src: snake,
      title: "Snake Game",
      href: "https://agogte.github.io/snake/",
    },
    {
      id: 10,
      src: hangman,
      title: "Hangman Game",
      href: "https://agogte.github.io/hangman/",
    },
    {
      id: 11,
      src: whowantstobeamillionair,
      title: "Who Wants to Be a Millionaire?",
      href: "https://agogte.github.io/whowantstobeamillionaire/",
    },
    {
      id: 12,
      src: candycrush,
      title: "Candy Crush Clone",
      href: "https://agogte.github.io/candycrushclone/",
    },
  ];

  const renderProject = ({ id, src, title, href }) => (
    <a
      key={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-900 rounded-lg p-3 shadow-md hover:scale-105 hover:shadow-white transition-transform duration-300 flex flex-col items-center"
    >
      <img
        src={src}
        alt={title}
        className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2"
      />
      <p className="text-sm md:text-base font-semibold text-center">{title}</p>
    </a>
  );

  return (
    <div
      name="portfolio"
      className="w-full h-screen py-20 md:py-16 bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-xl mx-auto p-4 flex flex-col justify-center w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-4xl sm:text-5xl font-bold inline border-b-4 border-gray-500">
            Portfolio
          </p>
          <p className="mt-2 text-gray-400">
            Selected projects from my resume and side projects
          </p>
        </div>

        {/* Top row: resume projects */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-8">
          {topProjects.map(renderProject)}
        </div>

        {/* Second row: other projects */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-10">
          {otherProjects.map(renderProject)}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
