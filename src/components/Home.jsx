import React from "react";
import { Link } from "react-scroll";
import FlagCanvas from "./FlagCanvas";
import { Reveal } from "./Signal";

const stats = [
  { value: "+40%", label: "Throughput on a 10k+ txn platform" },
  { value: "−35%", label: "P95 latency under production load" },
  { value: "−55%", label: "Mean time to recovery" },
  { value: "99.99%", label: "Uptime across blue/green releases" },
];

const Home = () => (
  <section
    name="Home"
    id="Home"
    className="flex flex-col justify-center pt-28 md:min-h-screen md:pt-20"
  >
    <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
      <div className="grid items-center gap-10 pb-14 md:grid-cols-[1.05fr_.95fr] md:gap-16 md:pb-16">
        <Reveal>
          <p className="sg-eyebrow text-accent">
            Software Engineer · Washington, DC
          </p>

          <h1 className="sg-display mt-6 text-[clamp(2.6rem,8vw,5.2rem)]">
            Ship to <span className="text-accent">1%</span> before you ship to
            everyone.
          </h1>

          <p className="mt-7 max-w-[46ch] text-[17px] leading-[1.65] text-muted">
            I build event-driven platforms, high-throughput APIs, and the
            release tooling that makes them safe to change, including the Go
            feature-flag service running in this diagram.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="portfolio"
              smooth
              duration={600}
              offset={-64}
              className="cursor-pointer border border-ink bg-ink px-7 py-3.5 text-[14px] font-semibold text-ground transition-opacity hover:opacity-85"
            >
              See the work
            </Link>
            <a
              href="https://drive.google.com/file/d/1H424_5anQ3FpUGUav1ksSkjZgN7b4kjN/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="border border-line px-7 py-3.5 text-[14px] font-semibold transition-colors hover:border-ink"
            >
              Résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <FlagCanvas />
        </Reveal>
      </div>

      {/* Impact strip: hairline-divided, no cards */}
      <Reveal
        delay={200}
        className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="border-b border-line px-1 py-7 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 lg:last:border-r-0 sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
          >
            <p className="text-[2rem] font-extrabold tabular-nums leading-none tracking-tightest">
              {value}
            </p>
            <p className="mt-3 text-[13px] leading-snug text-muted">{label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

export default Home;
