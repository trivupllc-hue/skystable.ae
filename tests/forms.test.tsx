// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "../src/components/Layout";
import { BookingPage } from "../src/components/Booking";
import { TradingPage } from "../src/components/Trading";
import { GalleryPage } from "../src/components/Gallery";
import { FAQ } from "../src/components/Sections";
import { site } from "../src/data/site";
beforeEach(() => {
  vi.stubGlobal("open", vi.fn());
  vi.stubGlobal("scrollTo", vi.fn());
  Element.prototype.scrollIntoView = vi.fn();
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function booking(path = "/book") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <BookingPage />
    </MemoryRouter>,
  );
}
describe("Booking form integration", () => {
  it("preselects service and package notes from the CTA", () => {
    booking("/book?service=Beach+Horse+Riding&notes=Beach+package");
    expect(
      (screen.getByLabelText(/Service type/) as HTMLSelectElement).value,
    ).toBe("Beach Horse Riding");
    expect(
      (screen.getByLabelText(/Special requests/) as HTMLTextAreaElement).value,
    ).toBe("Beach package");
  });
  it("shows field errors and does not open WhatsApp for an incomplete request", async () => {
    booking();
    fireEvent.click(
      screen.getByRole("button", { name: "Send Request via WhatsApp" }),
    );
    await waitFor(() =>
      expect(screen.getAllByRole("alert").length).toBeGreaterThan(0),
    );
    expect(window.open).not.toHaveBeenCalled();
    expect(screen.getByText("Please enter your full name.")).toBeTruthy();
  });
  it("opens a correctly encoded draft and explains the send/confirmation steps", async () => {
    booking("/book?service=Private+Horse+Riding");
    fireEvent.change(screen.getByLabelText(/Preferred date/), {
      target: { value: "2099-12-30" },
    });
    fireEvent.change(screen.getByLabelText(/Preferred time/), {
      target: { value: "07:00" },
    });
    fireEvent.change(screen.getByLabelText(/Full name/), {
      target: { value: "Test Rider" },
    });
    fireEvent.change(screen.getByLabelText(/WhatsApp \/ mobile/), {
      target: { value: "+971501234567" },
    });
    fireEvent.change(screen.getByLabelText(/Special requests/), {
      target: { value: "Beginner & friend" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Send Request via WhatsApp" }),
    );
    await waitFor(() => expect(window.open).toHaveBeenCalledOnce());
    const link = screen
      .getByRole("link", { name: /Continue to WhatsApp/ })
      .getAttribute("href")!;
    const url = new URL(link);
    expect(url.pathname).toBe("/" + site.whatsappNumber);
    expect(url.searchParams.get("text")).toContain("Private Horse Riding");
    expect(url.searchParams.get("text")).toContain("Beginner & friend");
    expect(
      screen.getByText("You still need to tap Send in WhatsApp."),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Edit request" }));
    expect((screen.getByLabelText(/Full name/) as HTMLInputElement).value).toBe(
      "Test Rider",
    );
  });
  it("keeps a mismatched rider total from leaving the page", async () => {
    booking();
    fireEvent.change(screen.getByLabelText(/Total riders/), {
      target: { value: "3" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Send Request via WhatsApp" }),
    );
    await waitFor(() =>
      expect(
        screen.getByText(
          "Adults and children must add up to the number of riders.",
        ),
      ).toBeTruthy(),
    );
    expect(window.open).not.toHaveBeenCalled();
  });
});
describe("Horse selling enquiry", () => {
  it("prepares an enquiry without creating a listing", async () => {
    render(
      <MemoryRouter>
        <TradingPage />
      </MemoryRouter>,
    );
    const values: [RegExp, string][] = [
      [/Your full name/, "Test Owner"],
      [/Phone with country code/, "+971501234567"],
      [/Horse’s name/, "Test horse"],
      [/Breed/, "Arabian"],
      [/^Age/, "8 years"],
      [/Horse’s location/, "Sharjah"],
      [/Training level/, "Intermediate"],
      [/Asking price/, "Request price"],
    ];
    values.forEach(([label, value]) =>
      fireEvent.change(screen.getByLabelText(label), { target: { value } }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Send Selling Enquiry" }),
    );
    await waitFor(() => expect(window.open).toHaveBeenCalledOnce());
    const link = screen
      .getByRole("link", { name: /Continue to WhatsApp/ })
      .getAttribute("href")!;
    expect(new URL(link).searchParams.get("text")).toContain(
      "Horse: Test horse",
    );
    expect(screen.getByText(/Your horse has not been listed/)).toBeTruthy();
  });
});
describe("Gallery and FAQ", () => {
  it("filters images and supports lightbox navigation and close", () => {
    render(
      <MemoryRouter>
        <GalleryPage />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Desert Riding" }));
    expect(screen.getAllByRole("button", { name: /^View / }).length).toBe(2);
    fireEvent.click(screen.getByRole("button", { name: "View Into the open" }));
    expect(screen.getByRole("dialog").getAttribute("open")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByText(/2 \/ 2/)).toBeTruthy();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowLeft" });
    expect(screen.getByText(/1 \/ 2/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Close image" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("opens FAQ answers with an accessible expanded state", () => {
    render(<FAQ />);
    const question = screen.getByRole("button", {
      name: "Are beach rides available every day?",
    });
    expect(question.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(question);
    expect(question.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByText(
        /Beach rides are subject to route availability, weather and permissions/,
      ),
    ).toBeTruthy();
  });
});

describe("Navigation state", () => {
  it("updates the selected service when another booking CTA is used on the booking route", () => {
    render(
      <MemoryRouter initialEntries={["/book?service=Beach+Horse+Riding"]}>
        <Link to="/book?service=Private+Horse+Riding">
          Choose a private ride
        </Link>
        <BookingPage />
      </MemoryRouter>,
    );
    fireEvent.click(
      screen.getByRole("link", { name: "Choose a private ride" }),
    );
    expect(
      (screen.getByLabelText(/Service type/) as HTMLSelectElement).value,
    ).toBe("Private Horse Riding");
  });
  it("closes the mobile navigation after following a link and restores scrolling", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<h1>Home content</h1>} />
            <Route path="gallery" element={<h1>Gallery content</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(screen.getByRole("dialog", { name: "Navigation" })).toBeTruthy();
    expect(document.body.style.overflow).toBe("hidden");
    const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
    fireEvent.click(nav.querySelector('a[href="/gallery"]')!);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(
      screen.getByRole("heading", { name: "Gallery content" }),
    ).toBeTruthy();
    expect(document.body.style.overflow).toBe("");
  });
});
