# Sky Stable — selected landing-page design

The owner selected the supplied “Sky Stable: Horse Riding in Ajman” screenshot on 12 November 2026. The production design follows its black header, flowing gold horse logo, white italic wordmark, sunset hero with right-aligned copy, inset booking panel, six service cards, dark benefits band, featured packages, booking steps, gallery and compact FAQ.

Business content uses the owner's confirmed **Sharjah** location, **+971 55 978 5604** and supplied map pin. Reference prices, ratings, testimonials, trainer credentials and placeholder contact details were not adopted as business facts.

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

The local browser connector is unavailable. Automated form tests and generated-page checks cover behavior and assets. Live screenshot checks, when available, are performed separately through the public site.
