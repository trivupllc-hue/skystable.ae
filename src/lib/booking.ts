import { z } from "zod";
import { serviceTypes, site } from "../data/site";
export function dubaiToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  return ["year", "month", "day"]
    .map((key) => parts.find((p) => p.type === key)?.value)
    .join("-");
}
const phone = z
  .string()
  .trim()
  .regex(
    /^\+?[\d\s()-]{7,22}$/,
    "Enter a valid phone number with country code.",
  )
  .refine(
    (v) =>
      v.replace(/\D/g, "").length >= 7 && v.replace(/\D/g, "").length <= 15,
    "Use 7–15 digits including country code.",
  );
const validDate = (v: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(v) &&
  !Number.isNaN(Date.parse(v)) &&
  new Date(v).toISOString().slice(0, 10) === v;
export const bookingSchema = z
  .object({
    service: z.enum(serviceTypes),
    date: z
      .string()
      .refine(validDate, "Choose a valid date.")
      .refine(
        (v) => v >= dubaiToday(),
        "Choose today or a future date in Dubai time.",
      ),
    time: z
      .string()
      .refine(
        (v) => site.rideTimeSlots.includes(v),
        "Choose a preferred time.",
      ),
    riders: z
      .number()
      .int()
      .min(1, "At least one rider is required.")
      .max(50, "For more than 50 riders, please call the team."),
    adults: z.number().int().min(0).max(50),
    children: z.number().int().min(0).max(50),
    experience: z.enum([
      "First time",
      "Beginner",
      "Intermediate",
      "Advanced",
      "Mixed group",
      "Not applicable",
    ]),
    duration: z
      .string()
      .refine((v) => site.durations.includes(v), "Choose a duration."),
    name: z.string().trim().min(2, "Please enter your full name.").max(100),
    phone,
    email: z.union([z.literal(""), z.email("Enter a valid email address.")]),
    notes: z
      .string()
      .trim()
      .max(1500, "Please keep requests under 1,500 characters."),
  })
  .refine((v) => v.adults + v.children === v.riders, {
    path: ["riders"],
    message: "Adults and children must add up to the number of riders.",
  })
  .refine(
    (v) =>
      !validDate(v.date) ||
      !site.rideTimeSlots.includes(v.time) ||
      new Date(`${v.date}T${v.time}:00+04:00`).getTime() > Date.now(),
    {
      path: ["time"],
      message:
        "That preferred time has already passed in Dubai. Choose a later time.",
    },
  );
export type BookingValues = z.infer<typeof bookingSchema>;
/** The homepage asks for total riders; ages and experience are discussed later. */
export const quickBookingSchema = z
  .object({
    service: bookingSchema.shape.service,
    date: bookingSchema.shape.date,
    time: bookingSchema.shape.time,
    riders: bookingSchema.shape.riders,
    name: bookingSchema.shape.name,
    phone: bookingSchema.shape.phone,
  })
  .refine(
    (v) =>
      !validDate(v.date) ||
      !site.rideTimeSlots.includes(v.time) ||
      new Date(`${v.date}T${v.time}:00+04:00`).getTime() > Date.now(),
    { path: ["time"], message: "Choose a future time in UAE time (UTC+4)." },
  );
export type QuickBookingValues = z.infer<typeof quickBookingSchema>;
export function quickBookingMessage(v: QuickBookingValues) {
  return `🐎 ${site.name.toUpperCase()} - RIDE ENQUIRY\n\nService: ${v.service}\nPreferred date: ${v.date}\nPreferred time: ${v.time} (Asia/Dubai, UTC+4)\nTotal riders: ${v.riders}\nName: ${v.name}\nPhone: ${v.phone}\n\nPlease confirm availability, price and meeting point. Rider ages, experience and duration to be discussed. Thank you!`;
}
export function bookingMessage(v: BookingValues) {
  return `🐎 ${site.name.toUpperCase()} - NEW BOOKING REQUEST\n\nService: ${v.service}\nDate: ${v.date}\nPreferred Time: ${v.time} (Asia/Dubai, UTC+4)\nRiders: ${v.riders}\nAdults / Children: ${v.adults} adults, ${v.children} children\nDuration: ${v.duration}\nExperience: ${v.experience}\nName: ${v.name}\nPhone: ${v.phone}${v.email ? `\nEmail: ${v.email}` : ""}\nSpecial Requests: ${v.notes || "None"}\n\nPlease confirm availability and pricing.\n\nThank you!`;
}
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
export const sellerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  phone,
  horseName: z.string().trim().min(1, "Enter the horse’s name.").max(100),
  breed: z.string().trim().min(2, "Enter the breed.").max(100),
  age: z.string().trim().min(1, "Enter the age.").max(30),
  gender: z.enum(["Mare", "Stallion", "Gelding"]),
  training: z.string().trim().min(2, "Describe the training level.").max(500),
  location: z.string().trim().min(2, "Enter the horse’s location.").max(200),
  price: z.string().max(100),
  notes: z.string().max(1500),
});
export type SellerValues = z.infer<typeof sellerSchema>;
export function sellerMessage(v: SellerValues) {
  return `🐎 ${site.name.toUpperCase()} - HORSE SELLING ENQUIRY\n\nOwner: ${v.name}\nPhone: ${v.phone}\nHorse: ${v.horseName}\nBreed: ${v.breed}\nAge: ${v.age}\nGender: ${v.gender}\nTraining: ${v.training}\nLocation: ${v.location}\nAsking price: ${v.price || "To discuss"}\nAdditional details: ${v.notes || "None"}\n\nPlease let me know the next steps. I can share photographs and documents in WhatsApp.`;
}
