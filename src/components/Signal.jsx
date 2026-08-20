import React, { useEffect, useRef, useState } from "react";

/**
 * Layout primitives for the Signal direction.
 *
 * The visual system is restrained and hairline-ruled: sections are separated
 * by a single rule rather than boxed, and colour is carried by one cobalt
 * accent plus a green reserved for genuine "on" states.
 */

/** Reveals its children once they scroll into view. */
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

/**
 * Full-width band, ruled off from the one above it. On tall-enough screens it
 * fills the viewport and centres its content, so each section reads as its own
 * page; on short or narrow screens it falls back to flowing normally rather
 * than clipping.
 */
export const Section = ({ name, className = "", children }) => (
  <section
    name={name}
    id={name}
    className={`flex scroll-mt-16 flex-col justify-center border-t border-line md:min-h-screen ${className}`}
  >
    <div className="mx-auto w-full max-w-shell px-5 py-12 sm:px-8 md:py-14">
      {children}
    </div>
  </section>
);

/**
 * Eyebrow + oversized heading pair that opens each section. `className`
 * replaces the default spacing outright, for sections that sit the heading
 * inside a column rather than across the full width.
 */
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
