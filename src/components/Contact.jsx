import React from "react";
import { Section, SectionHead, Reveal } from "./Signal";

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-0";

const channels = [
  {
    label: "Email",
    value: "agogte.career@gmail.com",
    href: "mailto:agogte.career@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "in/advait-gogte",
    href: "https://www.linkedin.com/in/advait-gogte/",
  },
  {
    label: "GitHub",
    value: "github.com/agogte",
    href: "https://github.com/agogte",
  },
];

const Contact = () => (
  <Section name="Contact">
    <SectionHead
      eyebrow="Contact"
      title="Let's talk."
      note="Send a note and I'll get back to you."
    />

    <div className="grid gap-12 md:grid-cols-[1.1fr_.9fr] md:gap-16">
      <Reveal>
        <form
          action="https://getform.io/f/3b90c72f-6505-4aba-a1b2-612c29f08205"
          method="post"
          className="space-y-7"
        >
          <div>
            <label htmlFor="name" className="sg-eyebrow mb-1 block">
              Name
            </label>
            <input id="name" type="text" name="name" required className={field} />
          </div>

          <div>
            <label htmlFor="email" className="sg-eyebrow mb-1 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className={field}
            />
          </div>

          <div>
            <label htmlFor="message" className="sg-eyebrow mb-1 block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className={`${field} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="border border-ink bg-ink px-7 py-3.5 text-[14px] font-semibold text-ground transition-opacity hover:opacity-85"
          >
            Send message
          </button>
        </form>
      </Reveal>

      <Reveal delay={120}>
        <p className="sg-eyebrow mb-5">Or reach me directly</p>
        <ul className="border-t border-line">
          {channels.map(({ label, value, href }) => (
            <li key={label} className="border-b border-line">
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-4 py-4"
              >
                <span className="sg-eyebrow">{label}</span>
                <span className="break-all text-right text-[15px] transition-colors group-hover:text-accent">
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </Section>
);

export default Contact;
