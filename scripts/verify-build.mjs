import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { routePaths, baseUrl } from "../.prerender/entry-server.js";
const titles = new Set();
let links = 0,
  images = 0;
const documents = new Map();
for (const route of routePaths) {
  const file =
    route === "/" ? "dist/index.html" : path.join("dist", route, "index.html");
  const html = await fs.readFile(file, "utf8");
  const document = new JSDOM(html).window.document;
  documents.set(route, document);
  assert.equal(
    document.querySelectorAll("h1").length,
    1,
    `Exactly one H1: ${route}`,
  );
  assert.ok(document.title.length > 10, `Title: ${route}`);
  assert.ok(!titles.has(document.title), `Unique title: ${route}`);
  titles.add(document.title);
  assert.ok(
    document.querySelector('meta[name="description"]')?.content,
    `Description: ${route}`,
  );
  assert.ok(
    document.querySelector('meta[property="og:title"]')?.content,
    `Open Graph: ${route}`,
  );
  assert.ok(
    JSON.parse(
      document.querySelector('script[type="application/ld+json"]').textContent,
    )["@graph"],
    `Schema: ${route}`,
  );
  assert.equal(
    document.querySelector('meta[name="robots"]').content,
    baseUrl() ? "index, follow" : "noindex, nofollow",
  );
  if (baseUrl())
    assert.ok(
      document
        .querySelector('link[rel="canonical"]')
        .href.startsWith(baseUrl()),
    );
  for (const image of document.images) {
    assert.ok(image.alt, `Alt text: ${route}`);
    const candidates = [
      image.getAttribute("src"),
      ...(image.getAttribute("srcset") || "")
        .split(",")
        .map((v) => v.trim().split(" ")[0]),
    ].filter(Boolean);
    for (const src of candidates) {
      if (src.startsWith("/")) await fs.access(path.join("dist", src));
    }
    images++;
  }
  for (const asset of document.querySelectorAll(
    'script[src],link[rel="stylesheet"]',
  )) {
    const src = asset.getAttribute("src") || asset.getAttribute("href");
    if (src?.startsWith("/")) await fs.access(path.join("dist", src));
  }
}
for (const [route, document] of documents) {
  for (const a of document.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    links++;
    assert.notEqual(href, "#", `No dummy link on ${route}`);
    if (href.startsWith("/") || href.startsWith("#")) {
      const url = new URL(href, `https://local.test${route}`);
      const target = url.pathname;
      if (target.startsWith("/images/")) {
        await fs.access(path.join("dist", target));
        continue;
      }
      assert.ok(documents.has(target), `Internal route ${href} from ${route}`);
      if (url.hash)
        assert.ok(
          documents.get(target).getElementById(url.hash.slice(1)),
          `Anchor ${href} from ${route}`,
        );
    }
  }
}
const notFound = new JSDOM(await fs.readFile("dist/404.html", "utf8")).window
  .document;
assert.equal(
  notFound.querySelector('meta[name="robots"]').content,
  "noindex, nofollow",
);
await fs.access("dist/sitemap.xml");
await fs.access("dist/robots.txt");
console.log(
  `Verified ${routePaths.length} prerendered pages, ${links} links, ${images} image instances, metadata, local assets and custom 404.`,
);
