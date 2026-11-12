import credits from "../../public/images/credits.json";
import { site } from "../data/site";
export function PrivacyPage() {
  return (
    <article className="section shell prose">
      <p className="eyebrow">YOUR INFORMATION</p>
      <h1>Privacy, in plain language.</h1>
      <h2>Booking and selling enquiries</h2>
      <p>
        This website prepares a WhatsApp message using the details you enter.
        There is no booking database, account system or payment collection. Form
        details are held in the current page’s memory and are not saved by this
        website.
      </p>
      <h2>Sending a message</h2>
      <p>
        When you continue to WhatsApp, your prepared details are passed to
        WhatsApp in the link. Review them before tapping Send. WhatsApp and your
        browser process those details under their own policies. Sky Stable
        receives the message only when you send it.
      </p>
      <h2>Photos, fonts and browsing</h2>
      <p>
        Website photographs and fonts are hosted with the site. No analytics or
        marketing cookies are installed. The hosting provider may process
        standard access logs, such as IP addresses and request information, to
        operate and secure the website.
      </p>
      <h2>External links</h2>
      <p>
        Google Maps, WhatsApp and any linked social platforms operate
        independently. Their own privacy policies apply when you visit them.
      </p>
      <h2>Your questions</h2>
      <p>
        To ask about a message you sent or request correction or deletion of
        your information held by Sky Stable, contact{" "}
        <a href={`tel:${site.callNumber}`}>{site.displayPhone}</a>.
      </p>
    </article>
  );
}
export function PhotographyPage() {
  return (
    <article className="section shell prose">
      <p className="eyebrow">VISUAL INSPIRATION</p>
      <h1>Photography credits.</h1>
      <p>
        Website imagery is illustrative and does not depict Sky Stable’s actual
        facilities, horses, staff or customers. The homepage sunset scene and
        logo were recreated with AI from the owner’s preferred design reference.
        Other photographs are licensed stock images; some were taken outside the
        UAE.
      </p>
      <p>
        The stock photography below is used under the{" "}
        <a
          href="https://www.pexels.com/license/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pexels License
        </a>
        . Image source and creator records are available in the{" "}
        <a
          href="/images/credits.json"
          target="_blank"
          rel="noopener noreferrer"
        >
          photography attribution file
        </a>
        .
      </p>
      <div className="credits-grid">
        {credits.map((c) => (
          <section className="credit-card" key={c.name}>
            <img
              src={`/images/${c.name}-640.webp`}
              alt={c.alt}
              width="640"
              height="400"
              loading="lazy"
            />
            <h2>Photography by {c.photographer}</h2>
            <p>{c.alt}</p>
            <a href={c.source} target="_blank" rel="noopener noreferrer">
              View original photograph
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
