import { useDubaiToday } from "../lib/useDubaiToday";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { site, serviceTypes, type ServiceType } from "../data/site";
import {
  bookingMessage,
  bookingSchema,
  whatsappUrl,
  type BookingValues,
} from "../lib/booking";
import { Photo } from "./ui";
export function BookingPage() {
  const [params] = useSearchParams();
  return <BookingForm key={params.toString()} />;
}
function BookingForm() {
  const today = useDubaiToday();
  const [params] = useSearchParams();
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const success = useRef<HTMLDivElement>(null);
  const selected = params.get("service");
  const service = serviceTypes.includes(selected as ServiceType)
    ? (selected as ServiceType)
    : "Desert Horse Riding";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service,
      date: params.get("date") || "",
      time: "",
      riders: 1,
      adults: 1,
      children: 0,
      experience: "First time",
      duration: "60 minutes",
      name: "",
      phone: "",
      email: "",
      notes: params.get("notes") || "",
    },
  });
  useEffect(() => {
    if (url) {
      success.current?.focus();
      success.current?.scrollIntoView({ block: "center" });
    }
  }, [url]);
  const error = (field: keyof BookingValues) =>
    errors[field] ? (
      <span id={`${field}-error`} className="field-error" role="alert">
        {errors[field]?.message}
      </span>
    ) : null;
  const accessibility = (field: keyof BookingValues) => ({
    "aria-invalid": !!errors[field],
    "aria-required": field !== "email" && field !== "notes",
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  function submit(values: BookingValues) {
    const text = bookingMessage(values);
    const nextUrl = whatsappUrl(text);
    setMessage(text);
    setUrl(nextUrl);
    window.open(nextUrl, "_blank", "noopener,noreferrer");
  }
  return (
    <section className="booking-page shell">
      <div className="booking-intro">
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <h1>
          Let’s make <br />
          <em>it a date.</em>
        </h1>
        <p>
          A first ride. A desert escape. A little time for you. Tell us what you
          have in mind.
        </p>
        <div className="booking-photo">
          <Photo
            name="private"
            alt="Horse and rider — illustrative stock photo"
          />
        </div>
        <div className="booking-reassurance">
          <ShieldCheck />
          <div>
            <h3>A request, then a conversation.</h3>
            <p>{site.policies.booking}</p>
          </div>
        </div>
        <p className="fine-print">
          No payment is taken here. Your details are not stored on this website.
          They are included in the WhatsApp message you choose to send.
        </p>
      </div>
      <div className="booking-panel">
        <div className="panel-heading">
          <span className="eyebrow">PLAN YOUR EXPERIENCE</span>
          <span>SHARJAH · UAE</span>
        </div>
        {url ? (
          <div
            ref={success}
            className="booking-success"
            tabIndex={-1}
            role="status"
          >
            <span className="success-icon">
              <Check />
            </span>
            <h2>Your message is ready.</h2>
            <p>
              <strong>You still need to tap Send in WhatsApp.</strong> Opening
              WhatsApp does not submit a booking. Your booking is confirmed only
              when Sky Stable replies.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              <MessageCircle size={18} />
              Continue to WhatsApp
              <ArrowUpRight size={17} />
            </a>
            <p className="fine-print">
              If a new window didn’t open, use the button above.
            </p>
            {copyError && (
              <p role="status">
                Copy is unavailable in this browser. Open “Review your prepared
                message” below to select the text manually.
              </p>
            )}
            <details>
              <summary>Review your prepared message</summary>
              <pre>{message}</pre>
            </details>
            <div className="button-row">
              <button
                className="button button-outline"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(message);
                    setCopied(true);
                    setCopyError(false);
                  } catch {
                    setCopied(false);
                    setCopyError(true);
                  }
                }}
              >
                {copied ? "Message copied" : "Copy message"}
              </button>
              <button
                className="text-button"
                onClick={() => {
                  setUrl("");
                  setCopied(false);
                }}
              >
                Edit request
              </button>
              <button
                className="text-button"
                onClick={() => {
                  reset();
                  setUrl("");
                  setCopied(false);
                }}
              >
                Start again
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submit)} noValidate>
            <fieldset>
              <legend>
                <span>01</span>Your experience
              </legend>
              <label>
                Service type *
                <select {...register("service")} {...accessibility("service")}>
                  {serviceTypes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {error("service")}
              </label>
              <div className="form-grid">
                <label>
                  Preferred date *
                  <input
                    type="date"
                    min={today}
                    {...register("date")}
                    {...accessibility("date")}
                  />
                  {error("date")}
                </label>
                <label>
                  Preferred time *
                  <select {...register("time")} {...accessibility("time")}>
                    <option value="">Choose a time</option>
                    {site.rideTimeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t} · UAE time
                      </option>
                    ))}
                  </select>
                  {error("time")}
                </label>
              </div>
              <p className="field-hint">
                All dates and times use Asia/Dubai (UTC+4). These are suggested
                request slots, not guaranteed availability.
              </p>
              <div className="form-grid">
                <label>
                  Session duration *
                  <select
                    {...register("duration")}
                    {...accessibility("duration")}
                  >
                    {site.durations.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  {error("duration")}
                </label>
                <label>
                  Riding experience *
                  <select
                    {...register("experience")}
                    {...accessibility("experience")}
                  >
                    {[
                      "First time",
                      "Beginner",
                      "Intermediate",
                      "Advanced",
                      "Mixed group",
                      "Not applicable",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {error("experience")}
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <span>02</span>Who’s joining?
              </legend>
              <div className="form-grid three">
                <label>
                  Total riders *
                  <input
                    type="number"
                    min="1"
                    max="50"
                    {...register("riders", { valueAsNumber: true })}
                    {...accessibility("riders")}
                  />
                  {error("riders")}
                </label>
                <label>
                  Adults *
                  <input
                    type="number"
                    min="0"
                    max="50"
                    {...register("adults", { valueAsNumber: true })}
                    {...accessibility("adults")}
                  />
                  {error("adults")}
                </label>
                <label>
                  Children *
                  <input
                    type="number"
                    min="0"
                    max="50"
                    {...register("children", { valueAsNumber: true })}
                    {...accessibility("children")}
                  />
                  {error("children")}
                </label>
              </div>
              <p className="field-hint">
                For a service or horse enquiry, use 1 adult as the person
                enquiring. For children, share ages in special requests.
              </p>
            </fieldset>
            <fieldset>
              <legend>
                <span>03</span>A little about you
              </legend>
              <label>
                Full name *
                <input
                  autoComplete="name"
                  placeholder="Your full name"
                  {...register("name")}
                  {...accessibility("name")}
                />
                {error("name")}
              </label>
              <div className="form-grid">
                <label>
                  WhatsApp / mobile number *
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="Include country code"
                    {...register("phone")}
                    {...accessibility("phone")}
                  />
                  {error("phone")}
                </label>
                <label>
                  Email <span className="optional">(optional)</span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    {...accessibility("email")}
                  />
                  {error("email")}
                </label>
              </div>
              <label>
                Special requests <span className="optional">(optional)</span>
                <textarea
                  rows={3}
                  placeholder="Tell us anything that will help us plan your visit…"
                  maxLength={1500}
                  {...register("notes")}
                  {...accessibility("notes")}
                />
                {error("notes")}
              </label>
            </fieldset>
            <div className="booking-submit">
              <p>
                <MessageCircle size={18} />
                We’ll prepare your message in WhatsApp. Review it and tap Send
                to contact Sky Stable.
              </p>
              <button className="button" type="submit">
                Send Request via WhatsApp
                <ArrowUpRight size={18} />
              </button>
              <span>
                Your booking is confirmed only when Sky Stable replies.
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
