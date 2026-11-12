import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  GraduationCap,
  Handshake,
  Heart,
  House,
  MapPin,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Users,
  Truck,
  Waves,
} from "lucide-react";
import { faqs } from "../data/content";
import { packages, services, serviceTypes, site } from "../data/site";
import {
  quickBookingMessage,
  quickBookingSchema,
  whatsappUrl,
  formatTime,
  type QuickBookingValues,
} from "../lib/booking";
import { useDubaiToday } from "../lib/useDubaiToday";
import { BookButton, Photo, WhatsApp } from "./ui";

export function LandingBooking() {
  const today = useDubaiToday();
  const [preparedUrl, setPreparedUrl] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickBookingValues>({
    resolver: zodResolver(quickBookingSchema),
    defaultValues: {
      service: "Desert Horse Riding",
      date: "",
      time: "",
      riders: 1,
      name: "",
      phone: "",
    },
  });
  const selectedService = useWatch({ control, name: "service" });
  const inputProps = (key: keyof QuickBookingValues) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `quick-${key}-error` : undefined,
    "aria-required": true as const,
  });
  const error = (key: keyof QuickBookingValues) =>
    errors[key] && (
      <small className="compact-error" id={`quick-${key}-error`} role="alert">
        {errors[key]?.message}
      </small>
    );
  return (
    <section
      className="compact-booking"
      id="quick-booking"
      aria-labelledby="quick-booking-title"
    >
      <div className="compact-booking-heading">
        <CalendarDays size={29} />
        <h2 id="quick-booking-title">
          Book Your
          <br /> Horse Riding
        </h2>
        <p>
          Plan your next ride
          <br /> directly on WhatsApp.
        </p>
      </div>
      {preparedUrl ? (
        <div className="compact-success" role="status">
          <h3>Your message is ready.</h3>
          <p>
            Tap Send in WhatsApp. Sky Stable will reply to confirm your booking.
          </p>
          <div className="button-row">
            <a
              className="button"
              href={preparedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Continue to WhatsApp
            </a>
            <button className="text-button" onClick={() => setPreparedUrl("")}>
              Edit request
            </button>
          </div>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit((values) => {
            if (values.service === "Horse Transport Enquiry") return;
            const url = whatsappUrl(quickBookingMessage(values));
            setPreparedUrl(url);
            window.open(url, "_blank", "noopener,noreferrer");
          })}
        >
          <label className="quick-service">
            Ride type *
            <select {...register("service")} {...inputProps("service")}>
              {serviceTypes.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
            {error("service")}
          </label>
          {selectedService === "Horse Transport Enquiry" ? (
            <div className="quick-transport">
              <p>
                Moving a horse? Tell us the pickup, destination and whether you
                need a return trip.
              </p>
              <Link
                className="button"
                to="/horse-transport-sharjah#transport-enquiry"
              >
                Plan Horse Transport <Truck size={18} />
              </Link>
            </div>
          ) : (
            <>
              <label className="quick-date">
                Date *
                <input
                  type="date"
                  min={today}
                  {...register("date")}
                  {...inputProps("date")}
                />
                {error("date")}
              </label>
              <label className="quick-time">
                Time · UAE *
                <select {...register("time")} {...inputProps("time")}>
                  <option value="">Select time</option>
                  {site.rideTimeSlots.map((time) => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
                {error("time")}
              </label>
              <label className="quick-riders">
                Riders *
                <select
                  {...register("riders", { valueAsNumber: true })}
                  {...inputProps("riders")}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50].map(
                    (n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "rider" : "riders"}
                      </option>
                    ),
                  )}
                </select>
                {error("riders")}
              </label>
              <label className="quick-name">
                Your name *
                <input
                  placeholder="Enter your name"
                  autoComplete="name"
                  maxLength={100}
                  {...register("name")}
                  {...inputProps("name")}
                />
                {error("name")}
              </label>
              <label className="quick-phone">
                Mobile / WhatsApp *
                <input
                  type="tel"
                  placeholder="+971 · Your mobile number"
                  autoComplete="tel"
                  {...register("phone")}
                  {...inputProps("phone")}
                />
                {error("phone")}
              </label>
              <button type="submit" className="button quick-submit">
                <MessageCircle size={20} />
                Book on WhatsApp
              </button>
              <p className="compact-note">
                <Check size={13} />
                You choose when to send. Availability and price confirmed by our
                team.
              </p>
            </>
          )}
        </form>
      )}
    </section>
  );
}

const serviceIcons = [GraduationCap, Truck, Mountain, Waves, House, Handshake];
const featureItems = [
  {
    icon: GraduationCap,
    title: "Riding Lessons",
    text: "Find a starting point for your riding goals.",
  },
  {
    icon: Users,
    title: "First Time Riding?",
    text: "Tell us your experience. We’ll help you plan.",
  },
  {
    icon: ShieldCheck,
    title: "Private Sessions",
    text: "Ask about a ride tailored to your pace.",
  },
  {
    icon: MapPin,
    title: "Sharjah Location",
    text: "Your next equestrian experience in the UAE.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    text: "Talk directly with our team before you ride.",
  },
];
const featured = [packages[1], packages[2], packages[5]];
const packageImages = ["desert", "beach", "lessons"];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="reference-home">
      <section className="reference-hero">
        <img
          className="reference-hero-image"
          src="/images/sunset-hero-1920.webp"
          srcSet="/images/sunset-hero-960.webp 960w, /images/sunset-hero-1920.webp 1920w"
          sizes="100vw"
          alt="Illustrative AI-generated scene of a white horse and rider beside desert dunes and the sea at sunset"
          width="1920"
          height="960"
          fetchPriority="high"
        />
        <div className="reference-hero-wash" />
        <div className="shell reference-hero-inner">
          <div className="reference-hero-copy">
            <p className="reference-eyebrow light">
              SKY STABLE <span>•</span> SHARJAH – UAE
            </p>
            <h1>
              Horse Riding
              <br /> in Sharjah
            </h1>
            <h2>
              Classes & Lessons · Horse Transport · Stable Services · Horse
              Trading
            </h2>
            <p>
              Experience the joy of horse riding — from your first lesson to
              desert adventures and coastal escapes. Your next unforgettable
              moment starts here.
            </p>
            <a className="button" href="#quick-booking">
              Book Your Ride Now <ArrowRight size={19} />
            </a>
          </div>
          <LandingBooking />
        </div>
        <span className="reference-image-caption">
          Illustrative AI-generated scene
        </span>
      </section>

      <section className="reference-services shell" id="experiences">
        <div className="reference-section-title">
          <p className="reference-eyebrow">OUR SERVICES</p>
          <h2>Complete Horse Riding Services in Sharjah</h2>
          <p>
            From learning to ride to new adventures, horse transport, stable
            care and horse trading — discover your place in the equestrian
            world.
          </p>
        </div>
        <div className="reference-service-grid">
          {services.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <Link
                to={`/${service.slug}`}
                className="reference-service-card"
                key={service.slug}
              >
                <Photo
                  name={service.image}
                  alt={`${service.alt} — illustrative stock photo`}
                />
                <div className="reference-service-body">
                  <div className="reference-service-title">
                    <Icon size={29} strokeWidth={1.5} />
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.description}</p>
                  <span
                    className="reference-round-arrow"
                    aria-label={`Explore ${service.title}`}
                  >
                    <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section
        className="reference-benefits"
        aria-label="Plan your Sky Stable visit"
      >
        <div className="shell">
          {featureItems.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon size={29} strokeWidth={1.6} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reference-packages shell" id="packages">
        <div className="reference-section-title">
          <p className="reference-eyebrow">FEATURED EXPERIENCES</p>
          <h2>Popular Ways to Enjoy Horse Riding</h2>
          <p>
            Find inspiration for your next visit. Our team will confirm the
            details and price before you book.
          </p>
        </div>
        <div className="reference-package-grid">
          {featured.map((pack, i) => (
            <article className="reference-package-card" key={pack.name}>
              <Photo
                name={packageImages[i]}
                alt={`${pack.name} — illustrative stock photography`}
              />
              <div className="reference-package-copy">
                <h3>{pack.name}</h3>
                <p>
                  {i === 0
                    ? "Open dunes, golden light and a fresh perspective on the desert."
                    : i === 1
                      ? "Sea air and coastal scenery. Routes are subject to availability and permissions."
                      : "Build confidence and develop your skills through regular riding lessons."}
                </p>
                <div className="reference-package-meta">
                  <strong>{pack.price || "Request Price"}</strong>
                  <span>
                    <Clock3 size={14} />
                    {i === 0 ? "Ask about duration" : "Plan with our team"}
                  </span>
                  <BookButton
                    service={pack.service}
                    notes={`I'm interested in the ${pack.name}.`}
                  >
                    Book Now
                  </BookButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reference-how shell">
        <div className="reference-side-heading">
          <p className="reference-eyebrow">HOW IT WORKS</p>
          <h2>
            Book Your Ride
            <br /> in 3 Simple Steps
          </h2>
          <p>A little planning. A wonderful experience to look forward to.</p>
        </div>
        <div className="reference-steps">
          {[
            {
              icon: ClipboardList,
              title: "1. Choose Your Service",
              text: "Select a class, private lesson, desert ride or another equestrian experience.",
            },
            {
              icon: CalendarDays,
              title: "2. Pick a Date & Time",
              text: "Choose your preferred day, time and number of riders.",
            },
            {
              icon: MessageCircle,
              title: "3. Confirm on WhatsApp",
              text: "Send your request. Our team confirms availability, price and meeting details.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="reference-step-icon">
                <Icon size={26} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reference-stories shell">
        <div className="reference-side-heading">
          <p className="reference-eyebrow">FROM OUR RIDERS</p>
          <h2>
            A Shared Love
            <br /> of Horses
          </h2>
          <p>Good moments deserve to be remembered.</p>
        </div>
        {site.reviews.length ? (
          <div className="reference-review-grid">
            {site.reviews.slice(0, 3).map((review) => (
              <blockquote key={review.name + review.date}>
                <p>“{review.text}”</p>
                <cite>
                  {review.name} · {review.date}
                </cite>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="reference-story-invite">
            <Heart size={34} strokeWidth={1.3} />
            <div>
              <h3>Your ride. Your story.</h3>
              <p>
                Already ridden with Sky Stable? Share your experience with us.
                <br /> Customer stories will appear here once shared with
                permission.
              </p>
            </div>
            <WhatsApp
              className="button-outline"
              message="Hello Sky Stable, I would like to share feedback about my ride."
            >
              Share Your Story
            </WhatsApp>
          </div>
        )}
      </section>

      <section className="reference-gallery shell">
        <div className="reference-side-heading">
          <p className="reference-eyebrow">GALLERY</p>
          <h2>
            Moments at
            <br /> Sky Stable
          </h2>
          <p>A little inspiration for your next equestrian adventure.</p>
          <Link to="/gallery" className="button">
            View Full Gallery <ArrowRight size={15} />
          </Link>
        </div>
        <div className="reference-gallery-strip">
          {["desert", "beach", "horse", "private", "stable"].map((name, i) => (
            <Link
              to="/gallery"
              key={name}
              aria-label={`Explore ${["desert riding", "beach riding", "horses", "riding lessons", "stable life"][i]} in our gallery`}
            >
              <Photo
                name={name}
                alt={`${["Desert ride", "Coastal ride", "Horse portrait", "Horse and rider", "Stable life"][i]} — illustrative stock photograph`}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="reference-faq-wrap">
        <div className="reference-faq shell" id="faq">
          <div className="reference-side-heading">
            <p className="reference-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2>Have a Question?</h2>
            <p>Find answers about horse riding, bookings and your visit.</p>
          </div>
          <div className="reference-faq-list">
            {faqs.slice(0, 5).map(([question, answer], i) => (
              <div className="reference-faq-item" key={question}>
                <h3>
                  <button
                    aria-expanded={openFaq === i}
                    aria-controls={`home-faq-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {question}
                    <ChevronDown size={17} />
                  </button>
                </h3>
                <p id={`home-faq-${i}`} hidden={openFaq !== i}>
                  {answer}
                </p>
              </div>
            ))}
          </div>
          <div className="reference-faq-image">
            <Photo
              name="desert"
              alt="Illustrative stock photograph of a desert ride"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
