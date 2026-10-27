import React, { useEffect, useMemo, useRef, useState } from "react";
import { createSpring, prefersReducedMotion, spring } from "../motion";

// Slow enough to read as counting, critically damped so it never passes the
// real number.
const COUNT = spring({ response: 0.9, damping: 1 });

export const CountUp = ({ value, delay = 120, className = "" }) => {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  const parsed = useMemo(() => {
    const match = String(value).match(/^(\D*?)([\d.]+)(.*)$/);
    if (!match) return null;
    const [, prefix, digits, suffix] = match;
    return {
      prefix,
      suffix,
      target: parseFloat(digits),
      decimals: (digits.split(".")[1] || "").length,
    };
  }, [value]);

  useEffect(() => {
    if (!parsed) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      setCurrent(parsed.target);
      return undefined;
    }

    const motion = createSpring(0, setCurrent, COUNT);
    let timer = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => motion.to(parsed.target), delay);
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      motion.stop();
      clearTimeout(timer);
    };
  }, [parsed, delay]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {parsed.prefix}
        {current.toFixed(parsed.decimals)}
        {parsed.suffix}
      </span>
    </span>
  );
};

export const Reveal = ({ as: Tag = "div", delay = 0, className = "", children }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
};

export const Section = ({ name, className = "", children }) => (
  <section
    name={name}
    id={name}
    className={`scroll-mt-16 ${className}`}
  >
    <div className="mx-auto w-full max-w-shell px-6 py-24 sm:px-10 md:py-40">
      {children}
    </div>
  </section>
);

export const SectionHead = ({
  eyebrow,
  title,
  note,
  className = "mb-12 md:mb-16",
}) => (
  <Reveal className={className}>
    <p className="label">{eyebrow}</p>
    <h2 className="title-1 mt-3 max-w-[20ch]">{title}</h2>
    {note && (
      <p className="mt-4 max-w-[52ch] text-ink-2">{note}</p>
    )}
  </Reveal>
);
