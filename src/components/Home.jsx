import React from "react";
import { Link } from "react-scroll";
import FlagCanvas from "./FlagCanvas";
import { ArrowUpRight } from "./Icons";
import { Reveal, CountUp, useSpotlight } from "./Signal";

const stats = [
  { value: "+40%", label: "Throughput on a 10k+ txn platform" },
  { value: "−35%", label: "P95 latency under production load" },
  { value: "−55%", label: "Mean time to recovery" },
  { value: "99.99%", label: "Uptime across blue/green releases" },
];

const Home = () => {
  const spotlight = useSpotlight();

  return (
    <section {...spotlight} name="Home" id="Home" className="spotlight pt-32 md:pt-44">
      <div className="mx-auto w-full max-w-shell px-6 sm:px-10">
        <div className="grid items-center gap-16 md:grid-cols-[1.1fr_.9fr] md:gap-20">
          <Reveal>
            <p className="label">Software Engineer · Washington, DC</p>

            <h1 className="display mt-6">
              Ship to <span className="text-accent">1%</span> before you ship to
              everyone.
            </h1>

            <p className="mt-8 max-w-[44ch] text-[19px] leading-[30px] tracking-[-0.014em] text-ink-2">
              I build event-driven platforms, high-throughput APIs, and the
              release tooling that makes them safe to change, including the Go
              feature-flag service running in this diagram.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="portfolio"
                href="#portfolio"
                smooth
                duration={600}
                offset={-64}
                className="btn-primary"
              >
                See the work
              </Link>
              <a
                href="https://drive.google.com/file/d/1H424_5anQ3FpUGUav1ksSkjZgN7b4kjN/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="link callout"
              >
                Résumé
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <FlagCanvas />
          </Reveal>
        </div>

        <Reveal
          delay={160}
          className="mt-24 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 lg:grid-cols-4"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <CountUp
                value={value}
                className="block text-[28px] font-semibold leading-8 tracking-[-0.021em] tabular-nums"
              />
              <p className="footnote mt-2 max-w-[22ch] text-ink-2">{label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Home;
