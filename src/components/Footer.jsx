import React from "react";
import ThemeToggle from "./ThemeToggle";

const Footer = () => (
  <footer name="Footer" className="border-t border-line">
    <div className="mx-auto flex max-w-shell flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:px-10">
      <div>
        <p className="headline">Advait Gogte</p>
        <p className="footnote mt-1 text-ink-3">
          Software Engineer · Washington, DC
        </p>
      </div>

      <div className="flex items-center gap-6 sm:ml-auto">
        <ThemeToggle />
        <p className="footnote text-ink-3">© 2026</p>
      </div>
    </div>
  </footer>
);

export default Footer;
