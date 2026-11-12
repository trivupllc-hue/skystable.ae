import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MessageCircle, Truck } from "lucide-react";
import { PageIntro } from "../pages";
import { site, services } from "../data/site";
import {
  transportSchema,
  transportMessage,
  whatsappUrl,
  type TransportValues,
} from "../lib/booking";
import { useDubaiToday } from "../lib/useDubaiToday";

export function TransportPage() {
  const service = services.find(
    (s) => s.booking === "Horse Transport Enquiry",
  )!;
  return (
    <>
      <PageIntro
        eyebrow="SKY STABLE · HORSE TRANSPORT"
        title="A one-off move. A few hours away."
        description="Horse transport for one-way journeys and short visits with a return trip. Tell us where your horse needs to go."
        image="horse"
      />
      <section className="section shell service-detail">
        <div>
          <p className="eyebrow">FROM HERE TO THERE</p>
          <h2>Horse Transport in Sharjah</h2>
          <p className="lead">{service.details}</p>
          <ul className="service-points">
            {service.points.map((point) => (
              <li key={point}>
                <Truck size={18} />
                {point}
              </li>
            ))}
          </ul>
          <a href="#transport-enquiry" className="button">
            Request Horse Transport <ArrowRight size={18} />
          </a>
        </div>
        <aside className="service-aside">
          <Truck />
          <h3>One way, or there and back.</h3>
          <p>
            Moving your horse to another stable? Request a single journey.
            Taking your horse somewhere for a few hours? Tell us when you would
            like a return pickup.
          </p>
          <p>
            Share the locations, number of horses and any handling or loading
            needs. The team will discuss the vehicle, timing, route and price
            with you.
          </p>
          <p>
            No ongoing booking is needed. Each transport request is arranged
            individually.
          </p>
        </aside>
      </section>
      <section
        className="section shell selling-grid"
        id="transport-enquiry"
        aria-labelledby="transport-title"
      >
        <div>
          <p className="eyebrow">PLAN YOUR HORSE’S JOURNEY</p>
          <h2 id="transport-title">Tell us where and when.</h2>
          <p>
            Complete the details and send your enquiry on WhatsApp. For a short
            visit, include your preferred return pickup time, such as “after
            three hours.”
          </p>
          <p>
            We’ll reply with availability, arrangements and a quote. Your
            transport is confirmed only after the team agrees the details with
            you.
          </p>
          <p className="fine-print">
            No payment is taken here. Your details are included only in the
            WhatsApp message you choose to send.
          </p>
          <a href={`tel:${site.callNumber}`} className="text-link">
            Prefer to call? {site.displayPhone}
          </a>
        </div>
        <TransportForm />
      </section>
    </>
  );
}

export function TransportForm() {
  const today = useDubaiToday();
  const [url, setUrl] = useState("");
  const success = useRef<HTMLDivElement>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransportValues>({
    resolver: zodResolver(transportSchema),
    defaultValues: {
      name: "",
      phone: "",
      pickup: "",
      destination: "",
      date: "",
      time: "",
      horses: 1,
      journey: "One-way move",
      returnTime: "",
      notes: "",
    },
  });
  const journey = useWatch({ control, name: "journey" });
  useEffect(() => {
    if (url) success.current?.focus();
  }, [url]);
  const accessibility = (field: keyof TransportValues) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `transport-${field}-error` : undefined,
    "aria-required":
      field !== "notes" &&
      (field !== "returnTime" || journey === "Short visit with return"),
  });
  const error = (field: keyof TransportValues) =>
    errors[field] ? (
      <span
        className="field-error"
        id={`transport-${field}-error`}
        role="alert"
      >
        {errors[field]?.message}
      </span>
    ) : null;
  return (
    <div className="booking-panel transport-panel">
      <div className="panel-heading">
        <span className="eyebrow">HORSE TRANSPORT ENQUIRY</span>
        <Truck size={24} />
      </div>
      {url ? (
        <div
          className="booking-success"
          ref={success}
          tabIndex={-1}
          role="status"
        >
          <h3>Your transport enquiry is ready.</h3>
          <p>
            Tap Send in WhatsApp. The team will reply to confirm arrangements
            and pricing.
          </p>
          <a
            className="button"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            Continue to WhatsApp
          </a>
          <button className="text-button" onClick={() => setUrl("")}>
            Edit request
          </button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit((values) => {
            const next = whatsappUrl(transportMessage(values));
            setUrl(next);
            window.open(next, "_blank", "noopener,noreferrer");
          })}
        >
          <div className="form-grid">
            <label>
              Your name *
              <input
                autoComplete="name"
                maxLength={100}
                {...register("name")}
                {...accessibility("name")}
              />
              {error("name")}
            </label>
            <label>
              Mobile / WhatsApp *
              <input
                type="tel"
                autoComplete="tel"
                placeholder="Include country code"
                {...register("phone")}
                {...accessibility("phone")}
              />
              {error("phone")}
            </label>
          </div>
          <label>
            Pickup location *
            <input
              placeholder="Stable / address / area"
              maxLength={250}
              {...register("pickup")}
              {...accessibility("pickup")}
            />
            {error("pickup")}
          </label>
          <label>
            Destination *
            <input
              placeholder="Where should your horse go?"
              maxLength={250}
              {...register("destination")}
              {...accessibility("destination")}
            />
            {error("destination")}
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
              Pickup time · UAE *
              <input
                type="time"
                {...register("time")}
                {...accessibility("time")}
              />
              {error("time")}
            </label>
          </div>
          <div className="form-grid">
            <label>
              Number of horses *
              <input
                type="number"
                min={1}
                max={20}
                {...register("horses", { valueAsNumber: true })}
                {...accessibility("horses")}
              />
              {error("horses")}
            </label>
            <label>
              Journey type *
              <select {...register("journey")} {...accessibility("journey")}>
                <option>One-way move</option>
                <option>Short visit with return</option>
              </select>
              {error("journey")}
            </label>
          </div>
          {journey === "Short visit with return" && (
            <label>
              Return pickup *
              <input
                placeholder="e.g. after 3 hours, or 5 pm the same day"
                maxLength={150}
                {...register("returnTime")}
                {...accessibility("returnTime")}
              />
              {error("returnTime")}
            </label>
          )}
          <label>
            Horse and journey details{" "}
            <span className="optional">(optional)</span>
            <textarea
              rows={3}
              maxLength={1500}
              placeholder="Tell us about loading, handling or other needs."
              {...register("notes")}
              {...accessibility("notes")}
            />
            {error("notes")}
          </label>
          <div className="booking-submit">
            <p>
              Review your enquiry in WhatsApp and tap Send. Availability and the
              quote will be confirmed by our team.
            </p>
            <button className="button" type="submit">
              <MessageCircle size={18} />
              Enquire on WhatsApp
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
