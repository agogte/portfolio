import React from "react";
import ThemeToggle from "./ThemeToggle";

const Footer = () => (
  <footer name="Footer" className="border-t border-line">
    <div className="mx-auto flex max-w-shell flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
      <div>
        <p className="text-[17px] font-extrabold tracking-tightest">
          Advait Gogte
        </p>
        <p className="sg-eyebrow mt-1.5">
          Software Engineer · Washington, DC
        </p>
      </div>

      <div className="flex items-center gap-5 sm:ml-auto">
        <ThemeToggle />
        <p className="sg-eyebrow">© 2026</p>
      </div>
    </div>
  </footer>
);

export default Footer;
