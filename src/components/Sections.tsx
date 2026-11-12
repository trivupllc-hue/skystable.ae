import { useDubaiToday } from "../lib/useDubaiToday";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  Plus,
  Minus,
  Users,
} from "lucide-react";
import { faqs } from "../data/content";
import { packages, services, site } from "../data/site";

import { BookButton, Photo, Reveal, SectionTitle, WhatsApp } from "./ui";
export function QuickBooking() {
  const today = useDubaiToday();
  const navigate = useNavigate();
  return (
    <div className="quick-booking shell">
      <div className="quick-heading">
        <span className="eyebrow">A MOMENT WORTH MAKING</span>
        <h2>
          Your next adventure
          <br />
          starts here.
        </h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          navigate(
            `/book?${new URLSearchParams({ service: String(data.get("service")), date: String(data.get("date")) })}`,
          );
        }}
      >
        <label>
          <span>
            <MapPin size={14} />
            CHOOSE AN EXPERIENCE
          </span>
          <select name="service" defaultValue="Desert Horse Riding">
            {services.map((s) => (
              <option key={s.slug} value={s.booking}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>
            <CalendarDays size={14} />
            PREFERRED DATE · UAE TIME
          </span>
          <input
            type="date"
            name="date"
            min={today}
            aria-label="Preferred date"
          />
        </label>
        <button className="button" type="submit">
          Plan My Ride
          <ArrowUpRight size={18} />
        </button>
      </form>
      <p>
        Preferred times are requests. Availability and pricing are confirmed by
        our team.
      </p>
    </div>
  );
}
export function Experiences({ full = true }: { full?: boolean }) {
  return (
    <section className="section shell" id="experiences">
      <div className="section-heading-row">
        <SectionTitle
          eyebrow="FIND YOUR KIND OF ADVENTURE"
          title={
            <>
              A little freedom.
              <br />
              <em>A lasting connection.</em>
            </>
          }
          description="From your first time in the saddle to the stillness of a desert ride, find an experience that feels like you."
        />
        {!full && (
          <Link className="text-link" to="/experiences">
            All experiences
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
      <div className="experience-grid">
        {services.slice(0, full ? 6 : 3).map((s, i) => (
          <Reveal key={s.slug}>
            <article className="experience-card">
              <Link to={`/${s.slug}`} className="experience-photo">
                <Photo
                  name={s.image}
                  alt={`${s.alt} — illustrative stock photo`}
                />
                <span className="card-number">0{i + 1}</span>
                <span className="circle-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </Link>
              <div className="experience-copy">
                <span className="eyebrow">{s.eyebrow}</span>
                <h3>
                  <Link to={`/${s.slug}`}>{s.title}</Link>
                </h3>
                <p>{s.description}</p>
                <div className="card-actions">
                  <Link to={`/${s.slug}`}>
                    View Details
                    <ArrowRight size={14} />
                  </Link>
                  <BookButton service={s.booking} className="text-button">
                    {i > 3 ? "Enquire" : "Book"} on WhatsApp
                  </BookButton>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="image-note">
        A glimpse of the equestrian world through illustrative stock
        photography.
      </p>
    </section>
  );
}
export function Packages() {
  return (
    <section className="packages-section section" id="packages">
      <div className="shell">
        <SectionTitle
          eyebrow="MAKE TIME FOR SOMETHING SPECIAL"
          title={
            <>
              Your ride. <em>Your way.</em>
            </>
          }
          description="Explore ideas for your next visit. Durations, inclusions, rider numbers and prices are agreed with the team before booking."
        />
        <div className="package-grid">
          {packages.map((p, i) => (
            <article
              className={`package-card ${i === 1 ? "featured" : ""}`}
              key={p.name}
            >
              <span className="package-index">0{i + 1} / THE EXPERIENCE</span>
              <h3>{p.name}</h3>
              <div className="package-price">
                {p.price || "Request Price"}
                <small>Availability confirmed on enquiry</small>
              </div>
              <ul className="package-facts">
                <li>
                  <Clock3 />
                  {p.duration}
                </li>
                <li>
                  <Users />
                  {p.riders}
                </li>
                <li>
                  <Check />
                  {p.level}
                </li>
              </ul>
              <p className="eyebrow">DISCUSS WITH THE TEAM</p>
              <ul className="inclusions">
                {p.includes.map((line) => (
                  <li key={line}>
                    <Check size={14} />
                    {line}
                  </li>
                ))}
              </ul>
              <BookButton
                service={p.service}
                notes={`I'm interested in the ${p.name}.`}
                className={i === 1 ? "" : "button-outline"}
              >
                Enquire About This Ride
              </BookButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function HowBookingWorks() {
  return (
    <section className="how-section section shell">
      <SectionTitle
        eyebrow="LESS PLANNING. MORE POSSIBILITY."
        title={
          <>
            The saddle is <em>three steps away.</em>
          </>
        }
      />
      <div className="steps">
        {[
          [
            "01",
            "Choose your experience",
            "A desert escape, a first lesson or time to develop your riding.",
          ],
          [
            "02",
            "Make it your moment",
            "Tell us your preferred date, time and who is joining you.",
          ],
          [
            "03",
            "Let’s talk on WhatsApp",
            "Send your request. We’ll confirm availability, meeting location, pricing and instructions.",
          ],
        ].map(([n, title, text]) => (
          <div className="step" key={n}>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section shell faq-section" id="faq">
      <div>
        <SectionTitle
          eyebrow="BEFORE YOU GET IN THE SADDLE"
          title={
            <>
              A few things
              <br />
              <em>you might wonder.</em>
            </>
          }
        />
        <p>
          Have something else in mind?
          <br />
          We’re a message away.
        </p>
        <WhatsApp className="button-outline">Ask Us a Question</WhatsApp>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <div className={`faq-item ${open === i ? "open" : ""}`} key={q}>
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {q}
                {open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </h3>
            <div id={`faq-answer-${i}`} hidden={open !== i}>
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <Photo
        name="desert"
        alt="Horse riding in a desert landscape — illustrative stock photo"
      />
      <div className="shell">
        <p className="eyebrow">STEP OUTSIDE. FEEL SOMETHING DIFFERENT.</p>
        <h2>
          Some moments
          <br />
          are better <em>in the saddle.</em>
        </h2>
        <p>Let’s find your next one.</p>
        <div className="button-row">
          <BookButton />
          <WhatsApp className="button-glass" />
        </div>
      </div>
    </section>
  );
}
export function ReviewSection() {
  return (
    <section className="review-section section shell">
      <MessageCircle size={30} />
      <p className="eyebrow">STORIES FROM THE SADDLE</p>
      <h2>
        Every rider has <em>a story.</em>
      </h2>
      {site.reviews.length ? (
        <div className="review-grid">
          {site.reviews.map((r) => (
            <blockquote key={r.name + r.date}>
              <p>“{r.text}”</p>
              <cite>
                {r.name} · {r.date}
              </cite>
            </blockquote>
          ))}
        </div>
      ) : (
        <>
          <p>
            Ridden with Sky Stable? We’d love to hear about your experience.
            <br />
            Customer stories will appear here once shared with permission.
          </p>
          <WhatsApp
            className="button-outline"
            message="Hello Sky Stable, I would like to share feedback about my ride."
          >
            Share Your Experience
          </WhatsApp>
        </>
      )}
    </section>
  );
}
