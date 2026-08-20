import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || running) return;
        running = true;
        setCurrent(0);
        clearTimeout(timer);
        timer = setTimeout(run, delay);
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
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
    <span ref={ref} className={className} aria-label={value}>
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

export const Spotlight = ({ className = "", children }) => {
  const spotlight = useSpotlight();

  return (
    <div {...spotlight} className={`sg-spotlight ${className}`}>
      {children}
    </div>
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={`sg-reveal ${shown ? "is-in" : ""} ${className}`}
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
      className={`sg-spotlight flex scroll-mt-16 flex-col justify-center border-t border-line md:min-h-screen ${className}`}
    >
      <div className="mx-auto w-full max-w-shell px-5 py-12 sm:px-8 md:py-14">
        {children}
      </div>
    </section>
  );
};

export const SectionHead = ({
  eyebrow,
  title,
  note,
  className = "mb-10 md:mb-12",
}) => (
  <Reveal className={className}>
    <p className="sg-eyebrow text-accent">{eyebrow}</p>
    <h2 className="sg-display mt-4 max-w-[16ch] text-4xl sm:text-5xl md:text-6xl">
      {title}
    </h2>
    {note && (
      <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted">
        {note}
      </p>
    )}
  </Reveal>
);
