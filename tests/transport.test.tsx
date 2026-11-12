// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TransportForm } from "../src/components/Transport";
import { LandingBooking } from "../src/components/Landing";
import { BookingPage } from "../src/components/Booking";
import {
  transportSchema,
  transportMessage,
  type TransportValues,
} from "../src/lib/booking";
import { site } from "../src/data/site";

const request: TransportValues = {
  name: "Horse Owner",
  phone: "+971501234567",
  pickup: "Sharjah stable A",
  destination: "Stable B & arena",
  date: "2099-12-30",
  time: "12:30",
  horses: 2,
  journey: "One-way move",
  returnTime: "",
  notes: "Please discuss loading requirements",
};
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Horse transport enquiries", () => {
  it("requires a valid future pickup, horse count and return plan only when needed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-12T12:00:00Z"));
    expect(transportSchema.safeParse(request).success).toBe(true);
    for (const change of [
      { horses: 0 },
      { horses: 1.5 },
      { date: "2027-02-30" },
      { date: "2026-11-12", time: "15:59" },
      { pickup: "" },
      { phone: "invalid" },
      { journey: "Short visit with return" },
    ]) {
      expect(transportSchema.safeParse({ ...request, ...change }).success).toBe(
        false,
      );
    }
    expect(
      transportSchema.safeParse({
        ...request,
        journey: "Short visit with return",
        returnTime: "After three hours",
      }).success,
    ).toBe(true);
    expect(
      transportMessage({ ...request, returnTime: "Unused old return time" }),
    ).not.toContain("Unused old return time");
  });
  it("prepares a return enquiry with locations and horses, and retains an editable fallback", async () => {
    vi.stubGlobal("open", vi.fn());
    render(<TransportForm />);
    for (const [label, value] of [
      [/Your name/, request.name],
      [/Mobile \/ WhatsApp/, request.phone],
      [/Pickup location/, request.pickup],
      [/^Destination/, request.destination],
      [/Preferred date/, request.date],
      [/Pickup time/, request.time],
      [/Number of horses/, "2"],
      [/Journey type/, "Short visit with return"],
    ] as const) {
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
    }
    fireEvent.click(
      screen.getByRole("button", { name: "Enquire on WhatsApp" }),
    );
    await screen.findByText("Tell us when you would like the return pickup.");
    expect(window.open).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/Return pickup/), {
      target: { value: "After three hours" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Enquire on WhatsApp" }),
    );
    await waitFor(() => expect(window.open).toHaveBeenCalledOnce());
    const url = new URL(
      screen
        .getByRole("link", { name: /Continue to WhatsApp/ })
        .getAttribute("href")!,
    );
    expect(url.pathname).toBe("/" + site.whatsappNumber);
    const text = url.searchParams.get("text")!;
    for (const value of [
      request.pickup,
      request.destination,
      "Horses: 2",
      "After three hours",
      "12:30",
      "Asia/Dubai",
    ])
      expect(text).toContain(value);
    expect(text).not.toContain("Riders:");
    fireEvent.click(screen.getByRole("button", { name: "Edit request" }));
    expect(
      (screen.getByLabelText(/Pickup location/) as HTMLInputElement).value,
    ).toBe(request.pickup);
  });
  it("offers the dedicated enquiry instead of rider fields on the homepage", () => {
    render(
      <MemoryRouter>
        <LandingBooking />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText(/Ride type/), {
      target: { value: "Horse Transport Enquiry" },
    });
    expect(screen.queryByLabelText(/^Riders/)).toBeNull();
    expect(
      screen
        .getByRole("link", { name: /Plan Horse Transport/ })
        .getAttribute("href"),
    ).toBe("/horse-transport-sharjah#transport-enquiry");
  });
  it("routes transport booking links to the transport page", async () => {
    render(
      <MemoryRouter initialEntries={["/book?service=Horse+Transport+Enquiry"]}>
        <Routes>
          <Route path="/book" element={<BookingPage />} />
          <Route
            path="/horse-transport-sharjah"
            element={<p>Transport destination</p>}
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByText("Transport destination")).toBeTruthy();
  });
});
