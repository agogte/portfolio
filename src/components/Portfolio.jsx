import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";

import utilynx from "../assets/portfolio/NPM.png";
import smartapigateway from "../assets/portfolio/smart-api.png";
import rabbitmqSample from "../assets/portfolio/queue.png";
import urlshortener from "../assets/portfolio/url-shortener.png";

import tictactoe from "../assets/portfolio/tictactoe.png";
import newssummarizer from "../assets/portfolio/newssummaizer.png";
import dadjokes from "../assets/portfolio/dadjokes.png";
import password_generator from "../assets/portfolio/password_generator.png";
import snake from "../assets/portfolio/snake.png";
import candycrush from "../assets/portfolio/candycrush.png";
import hangman from "../assets/portfolio/hangman.png";
import whowantstobeamillionair from "../assets/portfolio/whowantstobeamillionarie.png";

const featured = [
  {
    src: urlshortener,
    title: "URL Shortener — Observability Lab",
    blurb:
      "A shortener whose real subject is production observability: Prometheus metrics, Grafana dashboards and alert thresholds worth reasoning about.",
    stack: ["Node", "Prometheus", "Grafana"],
    href: "https://github.com/agogte/urlshortener",
  },
  {
    src: utilynx,
    title: "utilynx",
    blurb:
      "A published npm package of LINQ-inspired collection and utility functions for TypeScript.",
    stack: ["TypeScript", "npm"],
    href: "https://www.npmjs.com/package/@agogte/utilynx",
  },
  {
    src: smartapigateway,
    title: "Smart API Gateway",
    blurb:
      "Gateway internals written from scratch — routing, throttling and request shaping.",
    stack: ["Node"],
    href: "https://github.com/agogte/Smart-Api-Gateway",
  },
  {
    src: rabbitmqSample,
    title: "RabbitMQ Sample",
    blurb:
      "Messaging-queue scenarios and consumer patterns — groundwork behind pipelines that survive 5× spikes.",
    stack: ["Node", "RabbitMQ"],
    href: "https://github.com/agogte/rabbitMq-sample",
  },
];

const more = [
  { src: newssummarizer, title: "News Summarizer", href: "https://agogte.github.io/newssummarizer/" },
  { src: tictactoe, title: "Tic Tac Toe", href: "https://agogte.github.io/tic-tac-toe/" },
  { src: dadjokes, title: "Dad Jokes", href: "https://agogte.github.io/dadjokes/" },
  { src: password_generator, title: "Password Generator", href: "https://agogte.github.io/passgen_JS/" },
  { src: snake, title: "Snake", href: "https://agogte.github.io/snake/" },
  { src: hangman, title: "Hangman", href: "https://agogte.github.io/hangman/" },
  { src: whowantstobeamillionair, title: "Millionaire", href: "https://agogte.github.io/whowantstobeamillionaire/" },
  { src: candycrush, title: "Candy Crush", href: "https://agogte.github.io/candycrushclone/" },
];

const Portfolio = () => (
  <Section name="portfolio">
    <SectionHead
      eyebrow="Selected work"
      title="Also worth a look."
      className="mb-8 md:mb-10"
    />

    <div className="border-t border-line">
      {featured.map(({ src, title, blurb, stack, href }, i) => (
        <Reveal key={title} delay={i * 60}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-4 border-b border-line py-4 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8"
          >
            <img
              src={src}
              alt=""
              className="h-9 w-9 shrink-0 object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0"
            />

            <div className="min-w-0">
              <h3 className="text-[18px] font-extrabold tracking-tightest transition-colors group-hover:text-accent md:text-[20px]">
                {title}
              </h3>
              <p className="mt-1 max-w-[68ch] text-[14px] leading-snug text-muted">
                {blurb}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <ul className="hidden gap-3 lg:flex">
                {stack.map((s) => (
                  <li key={s} className="sg-eyebrow">
                    {s}
                  </li>
                ))}
              </ul>
              <span
                aria-hidden="true"
                className="text-[18px] text-muted transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent"
              >
                ↗
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-8">
      <p className="sg-eyebrow mb-3">Also built</p>
      <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
        {more.map(({ src, title, href }) => (
          <li key={title}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 border-b border-line py-2.5"
            >
              <img
                src={src}
                alt=""
                className="h-5 w-5 shrink-0 object-contain grayscale opacity-70 transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="truncate text-[13px] text-muted transition-colors group-hover:text-ink">
                {title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  </Section>
);

export default Portfolio;
