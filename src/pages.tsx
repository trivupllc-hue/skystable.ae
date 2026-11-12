import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { site, services } from "./data/site";
import { BookButton, Photo, SectionTitle, WhatsApp } from "./components/ui";
import {
  Experiences,
  FAQ,
  FinalCTA,
  HowBookingWorks,
  Packages,
  ReviewSection,
} from "./components/Sections";
import Landing from "./components/Landing";
export function Home() {
  return <Landing />;
}
export function PageIntro({
  eyebrow,
  title,
  description,
  image = "desert",
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="page-intro">
      <Photo
        name={image}
        alt={`${title} — illustrative stock photography`}
        priority
      />
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function ExperiencesPage() {
  return (
    <>
      <PageIntro
        eyebrow="SKY STABLE · SHARJAH"
        title="Find your next unforgettable moment."
        description="From classes and private lessons to desert rides and horse transport. Explore our services and let’s plan what you need."
      />
      <Experiences />
      <Packages />
      <HowBookingWorks />
      <FinalCTA />
    </>
  );
}
export function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound />;
  return (
    <>
      <PageIntro
        eyebrow={`${site.location} · ${service.eyebrow}`}
        title={service.title}
        description={service.description}
        image={service.image}
      />
      <section className="section shell service-detail">
        <div>
          <p className="eyebrow">TIME WELL SPENT</p>
          <h2>
            {service.title}{" "}
            <em>
              {service.slug.includes("uae") ? "in the UAE" : "in Sharjah"}
            </em>
          </h2>
          <p className="lead">{service.details}</p>
          <ul className="service-points">
            {service.points.map((point) => (
              <li key={point}>
                <Check />
                {point}
              </li>
            ))}
          </ul>
          <BookButton service={service.booking}>
            Request This Experience
          </BookButton>
          <p className="fine-print">{site.policies.booking}</p>
        </div>
        <aside className="service-aside">
          <ShieldCheck />
          {service.booking === "Horse Riding Classes" && (
            <>
              <h3>Private lessons, your own pace.</h3>
              <p>
                Prefer one-to-one instruction? Focus on the skills that matter
                to you, with a session planned around your goals, experience and
                preferred duration.
              </p>
              <BookButton service="Private Horse Riding">
                Enquire About Private Lessons
              </BookButton>
            </>
          )}
          <h3>Before your visit</h3>
          <p>
            Tell us about your riding experience and any support you may need.
            Ask about suitable equipment, clothing and the session’s
            requirements.
          </p>
          <p>
            For children, share their age and experience so the team can discuss
            suitability and supervision.
          </p>
          <p>
            Travelling from Ajman or Dubai? Confirm the meeting point and allow
            time for your journey.
          </p>
          <a
            className="text-link"
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View location
            <ArrowUpRight size={16} />
          </a>
        </aside>
      </section>
      {service.booking === "Horse Riding Classes" && (
        <section className="section shell lesson-levels">
          <SectionTitle
            eyebrow="ONE STEP AT A TIME"
            title={
              <>
                There’s always <em>room to grow.</em>
              </>
            }
          />
          <div className="three-grid">
            {(["Beginner", "Intermediate", "Advanced"] as const).map(
              (level) => (
                <article key={level}>
                  <h3>{level}</h3>
                  <p>
                    {level === "Beginner"
                      ? "Start with the fundamentals and build comfort around horses."
                      : level === "Intermediate"
                        ? "Discuss how to refine your balance, communication and control."
                        : "Share your goals and discuss the training and instructor support you need."}
                  </p>
                  <BookButton
                    service={`${level} Riding Lesson`}
                    className="button-outline"
                  >
                    Enquire
                  </BookButton>
                </article>
              ),
            )}
          </div>
        </section>
      )}
      <FAQ />
      <FinalCTA />
    </>
  );
}
export function StablePage() {
  const offerings = [
    [
      "Horse boarding",
      "Discuss your horse’s needs, intended stay and current boarding options.",
    ],
    [
      "Horse care",
      "Ask about daily routines, handling and individual care requirements.",
    ],
    [
      "Grooming",
      "Discuss grooming needs and the arrangements that may suit your horse.",
    ],
    [
      "Feeding",
      "Share your horse’s existing feeding routine and dietary requirements.",
    ],
    [
      "Stable management",
      "Enquire about management support and the scope of assistance required.",
    ],
    [
      "Equestrian support",
      "Have a different request? Tell the team what you have in mind.",
    ],
  ];
  return (
    <>
      <PageIntro
        eyebrow="EQUESTRIAN LIFE"
        title="Good care starts with a conversation."
        description="Stable services and horse care enquiries in Sharjah, UAE."
        image="stable"
      />
      <section className="section shell">
        <SectionTitle
          eyebrow="FOR YOUR HORSE"
          title={
            <>
              Individual needs.
              <br />
              <em>Thoughtful conversations.</em>
            </>
          }
          description="Explore the services you can enquire about. Facilities, availability, care arrangements and prices must be confirmed directly with Sky Stable."
        />
        <div className="three-grid stable-grid">
          {offerings.map(([title, text], i) => (
            <article key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <BookButton
                service="Stable Services Enquiry"
                notes={`I would like to enquire about ${title.toLowerCase()}.`}
                className="button-outline"
              >
                Enquire on WhatsApp
              </BookButton>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="THE SKY STABLE STORY"
        title="For the love of horses. And everything they bring."
        description="A connection to horses, the outdoors and the moments that stay with you."
        image="horse"
      />
      <section className="section shell about-copy">
        <SectionTitle
          eyebrow="ROOTED IN SHARJAH"
          title={
            <>
              A different pace.
              <br />
              <em>A new perspective.</em>
            </>
          }
        />
        <div>
          <p className="lead">
            Sky Stable is a horse riding and equestrian business in Sharjah,
            UAE. We welcome enquiries about riding lessons, desert and beach
            experiences, stable services, and buying and selling horses.
          </p>
          <p>
            Whether you live nearby in Sharjah or Ajman, or are planning a visit
            from Dubai, we invite you to share what you’re looking for. A first
            ride, a new skill, a little time outside. It starts with a
            conversation.
          </p>
          <BookButton />
        </div>
      </section>
      <section className="section cream-section">
        <div className="shell">
          <SectionTitle
            eyebrow="CONFIDENCE STARTS WITH UNDERSTANDING"
            title={
              <>
                Your first visit, <em>considered.</em>
              </>
            }
          />
          <div className="three-grid">
            <article>
              <ShieldCheck />
              <h3>Talk about suitability</h3>
              <p>
                Share your experience and any relevant needs. Ask the team about
                rider requirements, equipment and conditions before confirming.
              </p>
            </article>
            <article>
              <Users />
              <h3>Meet your instructor</h3>
              <p>
                {site.trainers.length
                  ? "Get to know the team below."
                  : "Ask who will guide your session and discuss their experience and teaching approach. Your instructor and session plan will be confirmed directly."}
              </p>
            </article>
            <article>
              <Heart />
              <h3>Come prepared</h3>
              <p>
                Confirm the meeting point, clothing, helmet arrangements and
                arrival instructions. Always follow your instructor’s guidance
                around horses.
              </p>
            </article>
          </div>
          {site.trainers.map((t) => (
            <article className="trainer" key={t.name}>
              <img src={t.image} alt={t.name} loading="lazy" />
              <h3>{t.name}</h3>
              <p>{t.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <ReviewSection />
      <FinalCTA />
    </>
  );
}
export function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="LET’S MAKE A PLAN"
        title="A good ride starts with hello."
        description="Talk to Sky Stable about riding, lessons and equestrian services in Sharjah."
        image="private"
      />
      <section className="section shell contact-grid">
        <div>
          <SectionTitle
            eyebrow="GET IN TOUCH"
            title={
              <>
                See you <em>in Sharjah.</em>
              </>
            }
          />
          <p>
            Tell us what you have in mind. Our team will confirm availability,
            pricing and everything you need to know before your visit.
          </p>
          <div className="contact-line">
            <span>CALL OR WHATSAPP</span>
            <a href={`tel:${site.callNumber}`}>{site.displayPhone}</a>
          </div>
          <div className="contact-line">
            <span>LOCATION</span>
            <p>{site.location}</p>
          </div>
          <div className="contact-line">
            <span>VISITING HOURS</span>
            <p>
              {site.openingHours || "Please confirm your visit with the team."}
            </p>
          </div>
          <div className="button-row">
            <WhatsApp />
            <a
              href={`tel:${site.callNumber}`}
              className="button button-outline"
            >
              Call Us
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="map-card">
          <div className="map-art" aria-hidden="true">
            <div />
            <div />
            <MapPin size={48} />
            <span>SHARJAH</span>
          </div>
          <h3>Your next chapter starts here.</h3>
          <p>
            Open our location in Google Maps. For rides away from the stable,
            confirm your meeting point with the team.
          </p>
          <a
            className="button button-dark"
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Google Maps
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <FAQ />
    </>
  );
}
export function NotFound() {
  return (
    <section className="section shell not-found">
      <p className="eyebrow">404 · A DIFFERENT TRAIL</p>
      <h1>Let’s find your way back.</h1>
      <p>
        This page doesn’t exist, but your next experience is waiting to be
        explored.
      </p>
      <Link to="/" className="button">
        Back to Home
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
