import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { prefersReducedMotion } from "../motion";

export const CountUp = ({
  value,
  duration = 1800,
  delay = 250,
  className = "",
}) => {
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

    let raf = 0;
    let timer = 0;
    let running = false;

    const run = () => {
      let startedAt = 0;
      const tick = (now) => {
        if (!startedAt) startedAt = now;
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(parsed.target * eased);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else running = false;
      };
      raf = requestAnimationFrame(tick);
    };

    // Same trigger point as Reveal, so the count starts once the stats are
    // visible rather than finishing while they fade in. Replays on re-entry.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || running) return;
        running = true;
        setCurrent(0);
        clearTimeout(timer);
        timer = setTimeout(run, delay);
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [parsed, duration, delay]);

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

export const useSpotlight = () => {
  const ref = useRef(null);

  const onMouseMove = useCallback((event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  }, []);

  const onMouseEnter = useCallback(() => {
    ref.current?.classList.add("is-hot");
  }, []);

  const onMouseLeave = useCallback(() => {
    ref.current?.classList.remove("is-hot");
  }, []);

  return { ref, onMouseMove, onMouseEnter, onMouseLeave };
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

export const Section = ({ name, className = "", children }) => {
  const spotlight = useSpotlight();

  return (
    <section
      {...spotlight}
      name={name}
      id={name}
      className={`spotlight scroll-mt-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-shell px-6 py-24 sm:px-10 md:py-40">
        {children}
      </div>
    </section>
  );
};

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
