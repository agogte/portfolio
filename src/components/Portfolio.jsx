import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";
import { ArrowUpRight } from "./Icons";

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
    title: "URL Shortener: Observability Lab",
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
      "Gateway internals written from scratch, covering routing, throttling and request shaping.",
    stack: ["Node"],
    href: "https://github.com/agogte/Smart-Api-Gateway",
  },
  {
    src: rabbitmqSample,
    title: "RabbitMQ Sample",
    blurb:
      "Messaging-queue scenarios and consumer patterns, the groundwork behind pipelines that survive 5× spikes.",
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

const tile = { "--r": "10px", boxShadow: "var(--shadow-1)" };

const Portfolio = () => (
  <Section name="portfolio">
    <SectionHead eyebrow="Selected work" title="Also worth a look." />

    <ul>
      {featured.map(({ src, title, blurb, stack, href }, i) => (
        <Reveal as="li" key={title} delay={i * 40}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="row group grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-5 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-x-6"
          >
            <span className="sq grid h-12 w-12 place-items-center bg-surface" style={tile}>
              <img src={src} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            </span>

            <div className="min-w-0">
              <h3 className="headline">{title}</h3>
              <p className="callout mt-1 max-w-[64ch] text-ink-2">{blurb}</p>
            </div>

            <div className="col-start-2 flex items-center gap-6 md:col-start-auto">
              <p className="footnote text-ink-3">{stack.join(" · ")}</p>
              <ArrowUpRight size={16} className="nudge hidden text-ink-3 md:block" />
            </div>
          </a>
        </Reveal>
      ))}
    </ul>

    <Reveal className="mt-20">
      <p className="label mb-4">Also built</p>
      <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
        {more.map(({ src, title, href }) => (
          <li key={title}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="row flex items-center gap-3 py-2.5"
            >
              <img src={src} alt="" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" />
              <span className="callout truncate text-ink-2">{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  </Section>
);

export default Portfolio;
