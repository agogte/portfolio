import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
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

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The bar stays transparent over the hero and gains a rule once you leave it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ground/85 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center gap-6 px-5 py-4 sm:px-8">
        <a
          href="/"
          className="text-[17px] font-extrabold tracking-tightest"
          aria-label="Advait Gogte — home"
        >
          AG
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {links.map(({ id, to, label }) => (
              <li key={id}>
                <Link
                  to={to}
                  smooth
                  duration={600}
                  offset={-64}
                  spy
                  activeClass="!text-ink"
                  className="cursor-pointer text-[14px] text-muted transition-colors hover:text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-1.5 text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-ground md:hidden">
          <ul className="mx-auto max-w-shell px-5 py-2 sm:px-8">
            {links.map(({ id, to, label }) => (
              <li key={id} className="border-b border-line last:border-0">
                <Link
                  to={to}
                  smooth
                  duration={600}
                  offset={-64}
                  onClick={() => setOpen(false)}
                  className="block cursor-pointer py-4 text-[15px] font-semibold"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
