import { afterEach, describe, expect, it, vi } from "vitest";
import {
  bookingMessage,
  bookingSchema,
  quickBookingSchema,
  dubaiToday,
  sellerMessage,
  sellerSchema,
  whatsappUrl,
  type BookingValues,
} from "../src/lib/booking";
import { site, services, packages } from "../src/data/site";
const valid: BookingValues = {
  service: "Desert Horse Riding",
  date: "2026-11-13",
  time: "07:00",
  riders: 3,
  adults: 2,
  children: 1,
  experience: "Mixed group",
  duration: "60 minutes",
  name: "Test Rider",
  phone: "+971 50 123 4567",
  email: "test@example.com",
  notes: "One first-time rider & a child.",
};
afterEach(() => vi.useRealTimers());
describe("Dubai time and booking validation", () => {
  it("rejects expired and impossible homepage booking slots", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-13T03:01:00Z"));
    expect(quickBookingSchema.safeParse(valid).success).toBe(false);
    expect(
      quickBookingSchema.safeParse({ ...valid, time: "08:00" }).success,
    ).toBe(true);
    expect(
      quickBookingSchema.safeParse({ ...valid, date: "2027-02-30" }).success,
    ).toBe(false);
  });
  it("uses Dubai calendar day at the UTC date boundary", () => {
    expect(dubaiToday(new Date("2026-11-12T20:30:00Z"))).toBe("2026-11-13");
    expect(dubaiToday(new Date("2026-11-12T19:59:00Z"))).toBe("2026-11-12");
  });
  it("accepts a complete future request and an optional empty email", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-12T12:00:00Z"));
    expect(bookingSchema.safeParse(valid).success).toBe(true);
    expect(bookingSchema.safeParse({ ...valid, email: "" }).success).toBe(true);
  });
  it("rejects past dates in Dubai even when UTC is still yesterday", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-12T21:00:00Z"));
    expect(
      bookingSchema.safeParse({ ...valid, date: "2026-11-12" }).success,
    ).toBe(false);
  });
  it("rejects a time that has passed today but accepts later slots", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-13T03:01:00Z"));
    expect(bookingSchema.safeParse(valid).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, time: "08:00" }).success).toBe(
      true,
    );
  });
  it("rejects impossible dates, unknown slots and inconsistent rider totals", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-12T12:00:00Z"));
    for (const change of [
      { date: "2027-02-30" },
      { time: "03:19" },
      { children: 0 },
      { riders: 0 },
      { riders: 1.5 },
      { adults: -1 },
    ])
      expect(bookingSchema.safeParse({ ...valid, ...change }).success).toBe(
        false,
      );
  });
  it("validates contact fields and rejects overly long requests", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-12T12:00:00Z"));
    for (const change of [
      { name: "" },
      { phone: "123" },
      { phone: "++++++++++" },
      { email: "broken" },
      { notes: "x".repeat(1501) },
    ])
      expect(bookingSchema.safeParse({ ...valid, ...change }).success).toBe(
        false,
      );
  });
});
describe("WhatsApp handoff", () => {
  it("preserves all request details and safely encodes special characters", () => {
    const message = bookingMessage(valid);
    const url = new URL(whatsappUrl(message));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/" + site.whatsappNumber);
    expect(url.searchParams.get("text")).toBe(message);
    for (const value of [
      "Mixed group",
      "2 adults, 1 children",
      "Asia/Dubai",
      "One first-time rider & a child.",
      "test@example.com",
      "Please confirm availability and pricing.",
    ])
      expect(message).toContain(value);
  });
  it("uses services accepted by the booking form across cards and packages", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-12T12:00:00Z"));
    for (const service of [
      ...services.map((s) => s.booking),
      ...packages.map((p) => p.service),
    ])
      expect(bookingSchema.safeParse({ ...valid, service }).success).toBe(true);
  });
  it("validates horse selling details and includes all facts in the enquiry", () => {
    const seller = {
      name: "Test Owner",
      phone: "+971501234567",
      horseName: "Test horse",
      breed: "Arabian",
      age: "8 years",
      gender: "Mare" as const,
      training: "Intermediate",
      location: "Sharjah",
      price: "To discuss",
      notes: "Viewing by appointment",
    };
    expect(sellerSchema.safeParse(seller).success).toBe(true);
    expect(sellerSchema.safeParse({ ...seller, breed: "" }).success).toBe(
      false,
    );
    const message = sellerMessage(seller);
    Object.values(seller).forEach((value) => expect(message).toContain(value));
    expect(message).not.toContain("listed successfully");
  });
});
