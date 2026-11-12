import fs from "node:fs/promises";
import path from "node:path";
import {
  render,
  routePaths,
  getMeta,
  structuredData,
  baseUrl,
} from "../.prerender/entry-server.js";
const template = await fs.readFile("dist/index.html", "utf8");
const escape = (v) =>
  String(v)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const route of [...routePaths, "/404"]) {
  const meta = getMeta(route);
  const base = baseUrl();
  const head = `<title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"/><meta name="robots" content="${meta.noindex ? "noindex, nofollow" : "index, follow"}"/>${meta.canonical ? `<link rel="canonical" href="${escape(meta.canonical)}"/>` : ""}<meta property="og:type" content="website"/><meta property="og:site_name" content="Sky Stable"/><meta property="og:locale" content="en_AE"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/>${base ? `<meta property="og:url" content="${escape(meta.canonical)}"/><meta property="og:image" content="${escape(base)}/images/sunset-hero-1920.webp"/><meta name="twitter:card" content="summary_large_image"/>` : ""}<script type="application/ld+json">${JSON.stringify(structuredData()).replaceAll("<", "\\u003c")}</script>`;
  const html = template
    .replace("<!--seo-->", head)
    .replace("<!--app-->", render(route));
  const file =
    route === "/"
      ? "dist/index.html"
      : route === "/404"
        ? "dist/404.html"
        : path.join("dist", route, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}
const base = baseUrl();
await fs.writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${base ? routePaths.map((p) => `<url><loc>${escape(base + p)}</loc></url>`).join("") : ""}</urlset>`,
);
await fs.writeFile(
  "dist/robots.txt",
  base
    ? `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n# Configure the verified public domain in src/data/site.ts or VITE_SITE_URL and rebuild.\n",
);
console.log(
  `Prerendered ${routePaths.length} pages and 404. ${base ? "Canonical domain: " + base : "Preview is noindex until the owner configures a verified public domain."}`,
);
