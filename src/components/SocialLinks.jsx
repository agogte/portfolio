import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const links = [
  {
    id: 1,
    label: "LinkedIn",
    icon: <FaLinkedin size={17} />,
    href: "https://www.linkedin.com/in/advait-gogte/",
  },
  {
    id: 2,
    label: "GitHub",
    icon: <FaGithub size={17} />,
    href: "https://github.com/agogte",
  },
  {
    id: 3,
    label: "Email",
    icon: <HiOutlineMail size={18} />,
    href: "mailto:agogte.career@gmail.com",
  },
  {
    id: 4,
    label: "Résumé",
    icon: <BsFillPersonLinesFill size={16} />,
    href: "https://drive.google.com/file/d/1H424_5anQ3FpUGUav1ksSkjZgN7b4kjN/view?usp=sharing",
  },
];

const SocialLinks = () => (
  <nav
    aria-label="Elsewhere"
    className="fixed bottom-8 left-6 z-40 hidden xl:block"
  >
    <ul className="flex flex-col items-center gap-5">
      {links.map(({ id, label, icon, href }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            title={label}
            className="block text-muted transition-colors hover:text-accent"
          >
            {icon}
            <span className="sr-only">{label}</span>
          </a>
        </li>
      ))}
    </ul>
    <span
      aria-hidden="true"
      className="mx-auto mt-5 block h-16 w-px bg-line"
    />
  </nav>
);

export default SocialLinks;
