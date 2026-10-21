import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders the hero headline", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: /ship to 1% before you ship/i })
    ).toBeInTheDocument();
  });

  test("renders every section the nav links to", () => {
    const names = [
      "Home",
      "About",
      "WorkExperience",
      "showcase",
      "portfolio",
      "Experience",
      "Certifications",
      "Contact",
    ];

    names.forEach((name) => {
      expect(document.querySelector(`[name="${name}"]`)).toBeInTheDocument();
    });
  });

  test("the nav lists every section", () => {
    const header = screen.getByRole("banner");
    ["About", "Experience", "Showcase", "Work", "Stack", "Certs", "Contact"].forEach(
      (label) => {
        expect(within(header).getAllByText(label).length).toBeGreaterThan(0);
      }
    );
  });

  test("every in-page link has a crawlable href to a real section", () => {
    const links = [...document.querySelectorAll("a")].filter(
      (a) => !a.getAttribute("href") || a.getAttribute("href").startsWith("#")
    );

    expect(links.length).toBeGreaterThan(0);
    links.forEach((a) => {
      const href = a.getAttribute("href");
      expect(href).toMatch(/^#.+/);
      expect(document.getElementById(href.slice(1))).toBeInTheDocument();
    });
  });

  test("showcase links to both featured repos", () => {
    const showcase = document.querySelector('[name="showcase"]');
    const hrefs = within(showcase)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));

    expect(hrefs).toContain("https://github.com/agogte/feature-flag-service");
    expect(hrefs).toContain("https://github.com/agogte/garmin_mcp");
  });

  test("certifications are ranked and every one has a verify link", () => {
    const section = document.querySelector('[name="Certifications"]');
    const links = within(section).getAllByRole("link");

    expect(links).toHaveLength(5);
    links.forEach((a) => {
      expect(a.getAttribute("href")).toMatch(/^https:\/\//);
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).toHaveAttribute("rel", expect.stringContaining("noopener"));
    });

    expect(within(section).getByText("01")).toBeInTheDocument();
    expect(within(section).getByText("05")).toBeInTheDocument();
  });

  test("work history shows the current role and switches roles", () => {
    const section = document.querySelector('[name="WorkExperience"]');
    const tabs = within(section).getAllByRole("tab");

    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(within(section).getByRole("tabpanel")).toHaveTextContent(
      "Software Engineer II"
    );
  });

  test("contact form requires every visible field", () => {
    const form = document.querySelector('[name="Contact"] form');

    ["name", "email", "message"].forEach((field) => {
      expect(form.querySelector(`[name="${field}"]`)).toBeRequired();
    });
  });
});
