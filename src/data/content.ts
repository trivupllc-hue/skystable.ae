import { site } from "./site";
export const faqs = [
  [
    "Can beginners book horse riding?",
    "Yes, beginners are welcome to enquire. Tell us that it is your first time so the team can discuss a suitable introductory lesson or ride before confirming.",
  ],
  [
    "What should I wear?",
    "Comfortable long trousers and closed-toe footwear are a sensible starting point. Ask the team to confirm suitable riding footwear, helmet provision and any other equipment requirements before attending.",
  ],
  [
    "Are lessons available for children?",
    "You can enquire about children’s lessons. Share the child’s age and riding experience; the team will confirm suitability, supervision and session options.",
  ],
  [
    "Can I book private sessions?",
    "Yes, you can request a private session. Tell us your experience, goals and preferred duration. Instructor availability and the final arrangement will be confirmed directly.",
  ],
  [
    "How do I book a desert ride?",
    "Choose Desert Horse Riding in the booking form, add your preferred date and time, and send the prepared WhatsApp message. Wait for the team to confirm the route, price and meeting point.",
  ],
  [
    "Are beach rides available every day?",
    `${site.policies.beach} They are not guaranteed on any particular date.`,
  ],
  ["Can I reschedule my booking?", site.policies.cancellation],
  [
    "Where is Sky Stable located?",
    "Sky Stable is in Sharjah, UAE, within reach of Ajman and Dubai. Use the map link on our contact page, and confirm the meeting point with the team for your specific experience.",
  ],
  [
    "Can I enquire about horse boarding?",
    "Yes. Share details about your horse, the care you need and your intended dates. The team will confirm current boarding options, facilities, inclusions and pricing.",
  ],
  [
    "Do you help with buying and selling horses?",
    "You can send buying and selling enquiries through our Horse Trading page. Current listings, viewing arrangements and any support offered will be confirmed directly.",
  ],
];
export const galleryCategories = [
  "All Moments",
  "Desert Riding",
  "Beach Riding",
  "Riding Lessons",
  "Horses",
  "Stable Life",
] as const;
export const gallery = [
  {
    id: "desert",
    category: "Desert Riding",
    title: "Into the open",
    alt: "Horse and rider crossing a desert landscape",
  },
  {
    id: "horse",
    category: "Horses",
    title: "A quiet connection",
    alt: "Portrait of a horse in natural light",
  },
  {
    id: "beach",
    category: "Beach Riding",
    title: "Where the land meets the sea",
    alt: "Horse riding along a sandy shoreline",
  },
  {
    id: "lessons",
    category: "Riding Lessons",
    title: "A little more confidence",
    alt: "Rider learning in an outdoor arena",
  },
  {
    id: "stable",
    category: "Stable Life",
    title: "Time at the stables",
    alt: "Horse in a stable environment",
  },
  {
    id: "private",
    category: "Riding Lessons",
    title: "Find your rhythm",
    alt: "Horse and rider during a riding session",
  },
  {
    id: "hero",
    category: "Desert Riding",
    title: "The desert, at its own pace",
    alt: "Lone rider on horseback in the Dubai desert",
  },
  {
    id: "children",
    category: "Riding Lessons",
    title: "The beginning of a journey",
    alt: "An introductory horse riding moment",
  },
];
