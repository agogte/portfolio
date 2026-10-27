import React, { useState } from "react";
import { Section, SectionHead, Reveal } from "./Signal";
import { ArrowUpRight } from "./Icons";

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const EMAIL = "agogte.career@gmail.com";

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
      <div role="status" className="fade-in">
        <p className="title-3">Message sent</p>
        <p className="mt-2 text-ink-2">
          Thanks for reaching out. I'll reply to the email you gave me.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link callout mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="footnote mb-2 block font-medium text-ink-2">
          Name
        </label>
        <input id="name" type="text" name="name" required className="field" />
      </div>

      <div>
        <label htmlFor="email" className="footnote mb-2 block font-medium text-ink-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="field"
        />
      </div>

      <div>
        <label htmlFor="message" className="footnote mb-2 block font-medium text-ink-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          className="field resize-y"
        />
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button type="submit" disabled={sending} className="btn-primary">
          {sending ? "Sending..." : "Send message"}
        </button>

        <p role="alert" className="footnote text-ink-2">
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

    <div className="grid gap-16 md:grid-cols-[1.1fr_.9fr] md:gap-24">
      <Reveal>
        <ContactForm />
      </Reveal>

      <Reveal delay={80}>
        <p className="label mb-4">Or reach me directly</p>
        <ul>
          {channels.map(({ label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="row group flex items-center justify-between gap-4 py-4"
              >
                <span className="callout text-ink-2">{label}</span>
                <span className="callout flex items-center gap-1.5 break-all text-right font-medium">
                  {value}
                  <ArrowUpRight size={12} className="nudge shrink-0 text-ink-3" />
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
