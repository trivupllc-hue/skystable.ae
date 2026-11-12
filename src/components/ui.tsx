import imageCredits from "../../public/images/credits.json";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappUrl } from "../lib/booking";
import { type ServiceType } from "../data/site";
export function Logo({ onNavigate }: { onNavigate?: () => void } = {}) {
  return (
    <Link
      to="/"
      className="logo"
      aria-label="Sky Stable home"
      onClick={onNavigate}
    >
      <img
        className="brand-logo"
        src="/images/sky-stable-logo.png"
        alt="Sky Stable — Horse Riding"
        width="420"
        height="210"
      />
    </Link>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const dimensions = imageCredits.find((image) => image.name === name);
  return (
    <img
      className={className}
      src={`/images/${name}-${priority ? (name === "hero" ? "1920" : "1200") : "640"}.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1200.webp 1200w${name === "hero" ? `, /images/hero-1920.webp 1920w` : ""}`}
      sizes={
        priority
          ? "100vw"
          : "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 40vw"
      }
      alt={alt}
      width={dimensions?.width ?? 1200}
      height={dimensions?.height ?? 800}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
export function BookButton({
  service = "Desert Horse Riding",
  children = "Book Your Ride",
  className = "",
  notes = "",
}: {
  service?: ServiceType;
  children?: ReactNode;
  className?: string;
  notes?: string;
}) {
  const query = new URLSearchParams({ service });
  if (notes) query.set("notes", notes);
  return (
    <Link
      to={
        service === "Horse Transport Enquiry"
          ? "/horse-transport-sharjah#transport-enquiry"
          : `/book?${query}`
      }
      className={`button ${className}`}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function WhatsApp({
  children = "WhatsApp Us",
  className = "",
  message = "Hello Sky Stable! I would like to enquire about horse riding in Sharjah.",
}: {
  children?: ReactNode;
  className?: string;
  message?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button ${className}`}
    >
      <MessageCircle size={17} />
      {children}
    </a>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-title ${light ? "light" : ""}`}>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [12, 0], opacity: [0.85, 1] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
