# Sky Stable — selected landing-page design

The owner selected the supplied “Sky Stable: Horse Riding in Ajman” screenshot on 12 November 2026. The production design follows its black header, flowing gold horse logo, white italic wordmark, sunset hero with right-aligned copy, inset booking panel, six service cards, dark benefits band, featured packages, booking steps, gallery and compact FAQ.

Business content uses the owner's confirmed **Sharjah** location, **+971 54 442 1098** and supplied map pin. Reference prices, ratings, testimonials, trainer credentials and placeholder contact details were not adopted as business facts.

## Assets

The original ChatGPT conversation could not be opened through the browser connector. The attached screenshot was used as the reference. The hero and logo are recreations, not original exported assets. Generated using the built-in image-generation tool; final selected assets were resized and encoded for web delivery.

- `public/images/sky-stable-logo.png`: gold horse and white wordmark on a dark background, used in the header and footer.
- `public/images/sunset-hero-1920.webp` and `sunset-hero-960.webp`: responsive illustrative sunset scene.
- The other photography remains licensed Pexels stock, recorded in `public/images/credits.json`.

The hero is explicitly labeled as AI-generated. The image credits page and footer disclose illustrative imagery.

## Final image prompts

### Hero — built-in image-generation edit using the supplied screenshot

Use case: precise-object-edit. Edit target: attached website screenshot. Extract and recreate ONLY the large top hero photograph as a clean cinematic web background, wide landscape 2.5:1 composition. Match the reference closely: white horse with long flowing pale mane on the left half, adult female rider viewed from behind wearing black equestrian helmet, black long sleeve top and cream riding breeches. Horse faces right; full head clearly visible near center-left. Golden sunset over UAE sandy dunes meeting calm blue coastline, distant subtle city skyline on far right. Right half predominantly luminous pale warm sky and distant sea, quiet negative space for black website text. Remove ALL UI, text, buttons, form, lettering, saddle logos and website elements. Reconstruct the unobscured scene. Photorealistic, warm amber and ivory, natural lighting, luxurious but believable. It is an illustrative generated scene, not a depiction of an actual stable. No text, no watermark, no logo. Output only the full-bleed hero photograph, not a webpage.

### Logo — built-in image-generation edit using the supplied screenshot

Extract the exact existing Sky Stable logo from the top-left of this screenshot, onto a perfectly uniform solid #111111 dark background. Preserve the original logo design: SMALL fine gold HORSE HEAD LINE ART ABOVE centered white elegant italic serif wordmark 'Sky Stable', thin gold horizontal rule split by small horseshoe beneath, and tiny gold widely spaced 'HORSE · RIDING'. Match the reference's delicate thin flowing gold mane outline, not a giant filled horse. Match white wordmark proportions exactly. Logo asset only, wide 2:1 canvas, logo fills 90% width. Everything crisp, flat, clean; NO shadows, NO glow, NO metallic 3D, NO embossing, NO gradients, NO texture, NO blur, NO transparency. Completely flat #111111 background. This is an extraction of a logo, not a design exploration. Exact lettering: Sky Stable; HORSE · RIDING.

## Behavior and validation

The homepage form validates required contact fields, total riders and future dates/times in UAE time. It prepares a WhatsApp draft, leaves a fallback link if the popup is blocked, and tells the visitor to send the message. Ages, experience and duration are discussed later, rather than inferred from the total rider count. The complete booking page remains available.

Desktop uses six service columns; tablet uses three; mobile uses two. The booking panel stacks on mobile, and the gallery strip scrolls horizontally. FAQ controls expose their expanded state and connect to their answer panels.

The local browser connector is unavailable. All 21 automated form and business-rule tests passed, as did generated-page checks for 14 routes. Full-page desktop (1440px) and mobile (390px) screenshots were reviewed through Firecrawl on the public site. A mobile heading-spacing issue found during that review was corrected. Real-device touch and popup behavior remain unverified.


## Shared page design and contact actions

All routes now use Georgia bold headings and DM Sans body text. Body copy and form controls use a 16px baseline; supporting labels use at least 14px. `src/typography.css` supplies the reading scale and responsive spacing. `src/shared-theme.css` applies the homepage’s warm ivory surfaces, soft card shadows, rounded gold gradient buttons, light photo banners and black/gold booking panels to the inner pages. Package cards include the same illustrative photo assets as the homepage.

The floating contact controls follow the owner’s trivup.com reference: circular green WhatsApp with a gentle expanding ring, and a blue Call button stacked above it on screens up to 640px. Call is hidden above 640px. Both use Sky Stable’s confirmed number. The former mobile contact bar is replaced by these controls; Book Now remains in the header and page content. Reduced-motion preferences disable the ring animation.

Desktop homepage and experiences-page screenshots, plus mobile homepage and booking-page screenshots, were reviewed after deployment. That review caught a missing space in the mobile booking heading, which was corrected. Build validation covered all 14 routes, links and local assets; 21 existing tests and lint passed.


The first two service cards now represent **Riding Classes & Lessons** and **Horse Transport**. The transport card uses a truck icon and existing illustrative horse photography. It retains the same ivory card surface and gold action styling. The combined learning page includes private-session information and its booking action; the transport page uses a matching black/gold enquiry panel with journey-specific fields.
