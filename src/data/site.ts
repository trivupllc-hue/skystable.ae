/** OWNER SETTINGS — edit this file, then rebuild/redeploy. Empty values are intentional. */
export const site = {
  name: "Sky Stable",
  tagline: "Horse Riding & Equestrian Experiences",
  location: "Sharjah, UAE",
  city: "Sharjah",
  country: "AE",
  whatsappNumber: "971544421098",
  callNumber: "+971544421098",
  displayPhone: "+971 54 442 1098",
  mapUrl: "https://maps.app.goo.gl/kfdHwSP7U9QduTgXA",
  streetAddress: "", // Add only the verified street address.
  openingHours: "", // Add confirmed public hours; never infer from preferred ride times.
  socials: { instagram: "", tiktok: "", youtube: "" },
  seo: {
    baseUrl: "https://skystable.ae",
    description:
      "Discover horse riding in Sharjah with Sky Stable. Explore desert rides, beach riding enquiries, riding lessons, horse transport, stable services and horse trading. Book through WhatsApp.",
  },
  rideTimeSlots: ["06:00", "07:00", "08:00", "16:00", "17:00", "18:00"],
  durations: [
    "30 minutes",
    "60 minutes",
    "90 minutes",
    "Discuss with the team",
  ],
  policies: {
    booking:
      "Your preferred date and time are a request. Your booking is confirmed only when Sky Stable replies with availability, pricing and meeting details.",
    cancellation:
      "Please contact the team to discuss rescheduling or cancellation. Applicable terms will be confirmed before you book.",
    beach:
      "Beach rides are subject to route availability, weather and permissions. Please enquire before making plans.",
  },
  trainers: [] as { name: string; bio: string; image: string }[],
  reviews: [] as { name: string; text: string; date: string }[], // Publish only genuine reviews with permission.
};

export const serviceTypes = [
  "Desert Horse Riding",
  "Beach Horse Riding",
  "Horse Riding Classes",
  "Beginner Riding Lesson",
  "Intermediate Riding Lesson",
  "Advanced Riding Lesson",
  "Private Horse Riding",
  "Children's Riding Lessons",
  "Horse Transport Enquiry",
  "Stable Services Enquiry",
  "Horse Buying Enquiry",
  "Horse Selling Enquiry",
] as const;
export type ServiceType = (typeof serviceTypes)[number];
export const services: {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  booking: ServiceType;
  details: string;
  points: string[];
}[] = [
  {
    slug: "horse-riding-classes-sharjah",
    title: "Riding Classes & Lessons",
    eyebrow: "LEARN & CONNECT",
    description:
      "Group classes and private lessons, shaped around your experience and goals.",
    image: "lessons",
    alt: "Rider practising in an outdoor riding arena",
    booking: "Horse Riding Classes",
    details:
      "Explore horse riding classes and private lessons in Sharjah, from your first introduction to a horse to developing your technique. Choose group learning or request one-to-one instruction at your own pace. Tell us your experience and goals so the team can help plan a suitable session.",
    points: [
      "Beginner, intermediate and advanced lesson enquiries",
      "Group classes, private sessions and children’s lesson enquiries",
      "Discuss balance, posture, steering and horse awareness",
      "Lesson plans and instructor details confirmed by the team",
    ],
  },
  {
    slug: "horse-transport-sharjah",
    title: "Horse Transport",
    eyebrow: "FROM HERE TO THERE",
    description:
      "Move your horse for a one-off journey or a short visit with a return trip.",
    image: "horse",
    alt: "Portrait of a horse",
    booking: "Horse Transport Enquiry",
    details:
      "Need to move your horse from one place to another? Request a one-way move or transport for a short visit with collection a few hours later. Share the pickup and destination, your preferred timing and the number of horses. The team will confirm the arrangements and quote before you book.",
    points: [
      "One-off, one-way horse moves",
      "Short visits with a requested return journey",
      "Pickup, destination, timing and price confirmed on enquiry",
    ],
  },
  {
    slug: "desert-horse-riding-sharjah",
    title: "Desert Horse Riding",
    eyebrow: "BEYOND THE EVERYDAY",
    description:
      "Open skies, quiet trails and a different perspective on the desert.",
    image: "desert",
    alt: "Horseback rider exploring a desert landscape",
    booking: "Desert Horse Riding",
    details:
      "Discover the appeal of horse riding in the UAE desert. Request a morning or late-afternoon ride and let the team help you understand the route, conditions and experience level required before confirming.",
    points: [
      "Request a morning or late-afternoon experience",
      "Route and pace matched after discussing your experience",
      "Weather, meeting point and availability confirmed before riding",
    ],
  },
  {
    slug: "beach-horse-riding-uae",
    title: "Beach Horse Riding",
    eyebrow: "FOLLOW THE COAST",
    description:
      "Sea air, open horizons and a coastal experience to enquire about.",
    image: "beach",
    alt: "Horse riding beside the sea on a sandy beach",
    booking: "Beach Horse Riding",
    details:
      "Ask about coastal riding experiences in the UAE. Beach routes require suitable conditions and permissions, so the team must confirm whether a ride can be arranged for your preferred date.",
    points: [
      "Subject to route availability and permissions",
      "Discuss suitability and travel arrangements",
      "No daily availability is assumed",
    ],
  },
  {
    slug: "stable-services",
    title: "Stable Services",
    eyebrow: "CARE & CONNECTION",
    description:
      "Start a conversation about boarding, care and your horse’s needs.",
    image: "stable",
    alt: "Handler leading horses into a stable",
    booking: "Stable Services Enquiry",
    details:
      "Every horse has individual needs. Enquire about boarding, daily care, grooming, feeding and stable management in Sharjah. The team will explain which services and arrangements are currently possible.",
    points: [
      "Boarding and care enquiries",
      "Discuss feeding routines and grooming needs",
      "Facilities, inclusions and availability confirmed directly",
    ],
  },
  {
    slug: "horse-trading",
    title: "Horse Trading",
    eyebrow: "FIND YOUR PARTNER",
    description:
      "Thoughtful conversations for those looking to buy or sell a horse.",
    image: "horse",
    alt: "Close-up portrait of a horse",
    booking: "Horse Buying Enquiry",
    details:
      "Whether you are searching for a horse or considering selling, start with an honest conversation about experience, goals and requirements. Listings appear only after details are supplied and verified by the owner.",
    points: [
      "Buying and selling enquiries across the UAE",
      "Share your preferred breed, age and training level",
      "Arrange independent checks before making a purchase",
    ],
  },
];

/** Package enquiry ideas, not guaranteed products. Set price only when approved. */
export const packages: {
  name: string;
  service: ServiceType;
  duration: string;
  level: string;
  riders: string;
  includes: string[];
  price: string | null;
}[] = [
  {
    name: "Beginner Experience",
    service: "Beginner Riding Lesson",
    duration: "Request 30–60 minutes",
    level: "First-time riders",
    riders: "Individual or group enquiry",
    includes: [
      "Introduction to horse handling",
      "Ask about basic riding instruction",
    ],
    price: null,
  },
  {
    name: "Desert Adventure",
    service: "Desert Horse Riding",
    duration: "Request 60–90 minutes",
    level: "Suitability discussed before booking",
    riders: "Individual or group enquiry",
    includes: [
      "Discuss a suitable desert route",
      "Request a morning or sunset time",
    ],
    price: null,
  },
  {
    name: "Beach Riding Experience",
    service: "Beach Horse Riding",
    duration: "Duration agreed on enquiry",
    level: "Experience assessed by the team",
    riders: "Rider numbers confirmed on enquiry",
    includes: [
      "Check coastal route permissions",
      "Discuss conditions and meeting point",
    ],
    price: null,
  },
  {
    name: "Private Riding Session",
    service: "Private Horse Riding",
    duration: "Request 30–60 minutes",
    level: "Tailored to your experience",
    riders: "Request one-to-one instruction",
    includes: [
      "Discuss personal riding goals",
      "Ask about an individual session plan",
    ],
    price: null,
  },
  {
    name: "Children’s Riding Lesson",
    service: "Children's Riding Lessons",
    duration: "Duration agreed on enquiry",
    level: "Suitability assessed individually",
    riders: "Child and guardian enquiry",
    includes: [
      "Discuss age and riding experience",
      "Ask about supervision and equipment",
    ],
    price: null,
  },
  {
    name: "Monthly Training Package",
    service: "Horse Riding Classes",
    duration: "Schedule agreed with the team",
    level: "Beginner to experienced enquiries",
    riders: "Individual training enquiry",
    includes: [
      "Discuss a regular lesson schedule",
      "Ask about progression and session count",
    ],
    price: null,
  },
];
