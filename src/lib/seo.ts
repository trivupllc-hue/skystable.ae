import { services, site } from "../data/site";
export const routePaths = [
  "/",
  "/experiences",
  ...services.map((s) => `/${s.slug}`),
  "/gallery",
  "/about",
  "/contact",
  "/book",
  "/privacy",
  "/photography",
];
export function baseUrl() {
  return (import.meta.env.VITE_SITE_URL || site.seo.baseUrl || "").replace(
    /\/$/,
    "",
  );
}
export function getMeta(path: string) {
  const known: Record<string, [string, string]> = {
    "/": [
      "Horse Riding in Sharjah | Classes, Desert Rides & Lessons | Sky Stable",
      site.seo.description,
    ],
    "/experiences": [
      "Horse Riding Experiences & Package Enquiries in Sharjah | Sky Stable",
      "Explore riding classes and lessons, desert and beach rides, and horse transport with Sky Stable in Sharjah. Request prices on WhatsApp.",
    ],
    "/horse-trading": [
      "Horse Trading & Horses for Sale Enquiries UAE | Sky Stable",
      "Enquire about buying or selling horses in the UAE. View genuine published listings and send horse details to Sky Stable through WhatsApp.",
    ],
    "/stable-services": [
      "Horse Boarding & Stable Services Enquiries Sharjah | Sky Stable",
      "Discuss horse boarding, care, grooming, feeding and stable management with Sky Stable in Sharjah. Availability and arrangements confirmed on enquiry.",
    ],
    "/gallery": [
      "Horse Riding Photography Gallery | Sky Stable Sharjah",
      "Explore illustrative equestrian photography of desert rides, beach riding, lessons, horses and stable life.",
    ],
    "/about": [
      "About Sky Stable | Horse Riding & Equestrian Life in Sharjah",
      "Get to know Sky Stable in Sharjah, UAE. Explore riding experiences, lessons and equestrian enquiries, with practical information for your first visit.",
    ],
    "/contact": [
      "Contact Sky Stable in Sharjah | WhatsApp, Phone & Location",
      "Contact Sky Stable on WhatsApp or by phone, view our Sharjah location and ask about riding, lessons, horse transport, care and trading.",
    ],
    "/book": [
      "Request a Horse Riding Booking in Sharjah | Sky Stable",
      "Choose your experience and preferred date, then send a booking request to Sky Stable via WhatsApp. Availability and pricing confirmed by the team.",
    ],
    "/privacy": [
      "Privacy | Sky Stable",
      "How Sky Stable’s website handles booking details and WhatsApp enquiries.",
    ],
    "/photography": [
      "Photography Credits | Sky Stable",
      "Sources and license information for the illustrative photographs used on the Sky Stable website.",
    ],
  };
  const service = services.find((s) => `/${s.slug}` === path);
  const entry =
    known[path] ||
    (service
      ? [
          `${service.title} ${service.slug.includes("uae") ? "UAE" : "in Sharjah"} | Sky Stable`,
          service.details,
        ]
      : [
          "Page Not Found | Sky Stable",
          "Find your way back to Sky Stable’s horse riding experiences.",
        ]);
  return {
    title: entry[0].replaceAll("Sky Stable", site.name),
    description: entry[1].replaceAll("Sky Stable", site.name),
    canonical: baseUrl() ? `${baseUrl()}${path === "/" ? "/" : path}` : "",
    noindex: !baseUrl() || !routePaths.includes(path),
  };
}
export function structuredData() {
  const url = baseUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": url ? `${url}/#organization` : "#organization",
        name: site.name,
        ...(url ? { url } : {}),
        telephone: site.callNumber,
        sameAs: Object.values(site.socials).filter(Boolean),
      },
      {
        "@type": "LocalBusiness",
        name: site.name,
        ...(url ? { url } : {}),
        telephone: site.callNumber,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: site.country,
          ...(site.streetAddress ? { streetAddress: site.streetAddress } : {}),
        },
        hasMap: site.mapUrl,
        ...(site.openingHours ? { openingHours: site.openingHours } : {}),
      },
    ],
  };
}
