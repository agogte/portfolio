import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: 1, to: "About", label: "About" },
  { id: 2, to: "WorkExperience", label: "Experience" },
  { id: 3, to: "showcase", label: "Showcase" },
  { id: 4, to: "portfolio", label: "Work" },
  { id: 5, to: "Experience", label: "Stack" },
  { id: 6, to: "Certifications", label: "Certs" },
  { id: 7, to: "Contact", label: "Contact" },
];

const bar =
  "absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-transform duration-[var(--dur-bouncy)] ease-[var(--spring-bouncy)]";

// Two strokes that cross into an X, so the icon changes shape instead of
// being swapped for a different one.
const MenuGlyph = ({ open }) => (
  <span aria-hidden="true" className="relative block h-5 w-5">
    <span
      className={bar}
      style={{ transform: open ? "translate(-50%, -50%) rotate(45deg)" : "translate(-50%, -4px)" }}
    />
    <span
      className={bar}
      style={{ transform: open ? "translate(-50%, -50%) rotate(-45deg)" : "translate(-50%, 3px)" }}
    />
  </span>
);

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const raised = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-opacity duration-200 ${
          raised ? "opacity-100" : "opacity-0"
        }`}
        style={{
          // A full sheet needs a denser material than a thin bar to stay legible.
          background: open ? "rgb(var(--c-canvas) / 0.94)" : "var(--material)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          boxShadow: "0 0.5px 0 var(--hairline-strong)",
        }}
      />

      <div className="mx-auto flex h-16 max-w-shell items-center gap-8 px-6 sm:px-10">
        <Link
          to="Home"
          href="#Home"
          smooth
          duration={600}
          className="press headline cursor-pointer tracking-[-0.02em]"
          aria-label="AG, back to top"
        >
          AG
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map(({ id, to, label }) => (
              <li key={id}>
                <Link
                  to={to}
                  href={`#${to}`}
                  smooth
                  duration={600}
                  offset={-64}
                  spy
                  activeClass="!text-ink"
                  className="press footnote block cursor-pointer rounded-full px-3 py-1.5 text-ink-2 hover:text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="press grid h-11 w-11 place-items-center rounded-full text-ink md:hidden"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>

      {/* Stays mounted so opening and closing are the same transition run in
          either direction, and a second tap mid-flight simply reverses it. */}
      <nav
        id="mobile-nav"
        inert={open ? undefined : ""}
        className={`grid transition-[grid-template-rows,opacity] duration-[var(--dur-snappy)] md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mx-auto max-w-shell px-6 pb-6 pt-2 sm:px-10">
            {links.map(({ id, to, label }, i) => (
              <li
                key={id}
                className="transition-transform duration-[var(--dur-bouncy)] ease-[var(--spring-bouncy)]"
                style={{
                  transform: open ? "none" : "translateY(-6px)",
                  transitionDelay: open ? `${i * 18}ms` : "0ms",
                }}
              >
                <Link
                  to={to}
                  href={`#${to}`}
                  smooth
                  duration={600}
                  offset={-64}
                  onClick={() => setOpen(false)}
                  className="press title-3 block cursor-pointer py-3"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
