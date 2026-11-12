import { site, packages } from "../src/data/site";
const origin = process.env.VITE_SITE_URL || site.seo.baseUrl;
const errors: string[] = [];
if (!/^\d{7,15}$/.test(site.whatsappNumber))
  errors.push("Set a valid WhatsApp number in src/data/site.ts.");
if (!/^\+\d{7,15}$/.test(site.callNumber))
  errors.push("Set a valid international call number.");
if (
  !origin ||
  !/^https:\/\/[^/]+\/?$/.test(origin) ||
  /example\.com|localhost/.test(origin)
)
  errors.push(
    "Set the verified HTTPS public domain in site.seo.baseUrl or VITE_SITE_URL.",
  );
if (!site.mapUrl.startsWith("https://"))
  errors.push("Set the verified map URL.");
if (errors.length) {
  console.error(
    "Launch configuration needs attention:\n" +
      errors.map((e) => "• " + e).join("\n"),
  );
  process.exitCode = 1;
} else console.log("Required launch settings are configured.");
console.log(
  `${packages.filter((p) => p.price === null).length} packages use honest Request Price labels. Missing social profiles, hours, trainer biographies and genuine reviews are intentionally omitted.`,
);
