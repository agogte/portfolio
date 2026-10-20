import { fireEvent, render, screen } from "@testing-library/react";
import Contact from "./Contact";

const fill = () => {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello" } });
  fireEvent.click(screen.getByRole("button", { name: /send message/i }));
};

describe("contact form", () => {
  const originalFetch = window.fetch;
  let requests;

  const respondWith = (status, body) => {
    window.fetch = (url, init) => {
      requests.push({ url, body: JSON.parse(init.body) });
      return Promise.resolve({ ok: status < 400, json: () => Promise.resolve(body) });
    };
  };

  beforeEach(() => {
    requests = [];
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  test("posts the fields to the contact worker and confirms", async () => {
    respondWith(200, { ok: true });
    render(<Contact />);

    fill();

    expect(await screen.findByText("Message sent")).toBeInTheDocument();
    expect(requests).toHaveLength(1);
    expect(requests[0].url).toBe("https://contact.test/");
    expect(requests[0].body).toMatchObject({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello",
      website: "",
    });
  });

  test("shows the worker's error with an email fallback", async () => {
    respondWith(429, { error: "Too many messages. Try again in a minute." });
    render(<Contact />);

    fill();

    expect(await screen.findByText(/too many messages/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me instead/i })).toHaveAttribute(
      "href",
      "mailto:agogte.career@gmail.com"
    );
  });
});
