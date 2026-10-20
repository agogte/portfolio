import React, { useState } from "react";
import { Section, SectionHead, Reveal } from "./Signal";

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const EMAIL = "agogte.career@gmail.com";

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-0";

const channels = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
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

const sendMessage = (fields) => {
  if (!ENDPOINT) return Promise.reject(new Error("Contact endpoint is not configured."));

  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  }).then((response) =>
    response
      .json()
      .catch(() => ({}))
      .then((body) => {
        if (!response.ok) throw new Error(body.error || "Could not send right now.");
      })
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");
    sendMessage(fields)
      .then(() => {
        form.reset();
        setStatus("sent");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  };

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-line pt-7">
        <p className="sg-eyebrow mb-3 text-accent">Message sent</p>
        <p className="text-[18px] leading-relaxed">
          Thanks for reaching out. I'll reply to the email you gave me.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[14px] font-semibold underline underline-offset-4 transition-colors hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
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

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={sending}
          className="border border-ink bg-ink px-7 py-3.5 text-[14px] font-semibold text-ground transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send message"}
        </button>

        <p role="alert" className="text-[14px] text-muted">
          {status === "error" && (
            <>
              {error}{" "}
              <a href={`mailto:${EMAIL}`} className="text-ink underline underline-offset-4">
                Email me instead
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
};

const Contact = () => (
  <Section name="Contact">
    <SectionHead
      eyebrow="Contact"
      title="Let's talk."
      note="Send a note and I'll get back to you."
    />

    <div className="grid gap-12 md:grid-cols-[1.1fr_.9fr] md:gap-16">
      <Reveal>
        <ContactForm />
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
