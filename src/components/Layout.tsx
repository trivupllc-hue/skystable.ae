import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { site } from "../data/site";
import { Logo, BookButton } from "./ui";
import { whatsappUrl } from "../lib/booking";
import { getMeta } from "../lib/seo";
const navigation = [
  ["Home", "/"],
  ["Services", "/experiences"],
  ["Packages", "/experiences#packages"],
  ["Gallery", "/gallery"],
  ["About Us", "/about"],
  ["FAQ", "/contact#faq"],
  ["Contact", "/contact"],
];
export default function Layout() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const lastPath = useRef(location.pathname);
  const menuRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const meta = getMeta(location.pathname);
    document.title = meta.title;
    const updateMeta = (selector: string, attrs: Record<string, string>) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attrs).forEach(([key, value]) =>
        element.setAttribute(key, value),
      );
    };
    updateMeta('meta[name="description"]', {
      name: "description",
      content: meta.description,
    });
    updateMeta('meta[name="robots"]', {
      name: "robots",
      content: meta.noindex ? "noindex, nofollow" : "index, follow",
    });
    updateMeta('meta[property="og:title"]', {
      property: "og:title",
      content: meta.title,
    });
    updateMeta('meta[property="og:description"]', {
      property: "og:description",
      content: meta.description,
    });
    if (meta.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", meta.canonical);
      updateMeta('meta[property="og:url"]', {
        property: "og:url",
        content: meta.canonical,
      });
    }
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else if (lastPath.current !== location.pathname) {
      window.scrollTo(0, 0);
      main.current?.focus();
    }
    lastPath.current = location.pathname;
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (menu) {
      menuRef.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    } else menuRef.current?.close();
  }, [menu]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-main shell">
          <Logo />
          <nav aria-label="Main navigation">
            {navigation.map(([title, path]) =>
              path.includes("#") ? (
                <Link key={path} to={path}>
                  {title}
                </Link>
              ) : (
                <NavLink key={path} to={path} end>
                  {title}
                </NavLink>
              ),
            )}
          </nav>
          <div className="header-contact-actions">
            <a
              className="header-contact"
              href={whatsappUrl(
                "Hello Sky Stable! I would like to enquire about a ride.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
            <a className="header-contact" href={`tel:${site.callNumber}`}>
              <Phone size={15} />
              Call
            </a>
          </div>
          <BookButton className="header-book">
            <CalendarDays size={15} />
            Book Now
          </BookButton>
          <button
            className="menu-toggle icon-button"
            onClick={() => setMenu(true)}
            aria-label="Open navigation"
            aria-expanded={menu}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={menuRef}
        className="mobile-menu"
        aria-label="Navigation"
        onCancel={() => setMenu(false)}
      >
        <div className="mobile-menu-top">
          <Logo onNavigate={() => setMenu(false)} />
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => setMenu(false)}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map(([title, path]) => (
            <NavLink key={path} to={path} onClick={() => setMenu(false)}>
              {title}
              <ArrowUpRight size={19} />
            </NavLink>
          ))}
        </nav>
        <a href={`tel:${site.callNumber}`}>{site.displayPhone}</a>
      </dialog>
      <main id="main" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              For the love of horses.
              <br />
              For the moments that stay with you.
            </p>
            <span className="location">
              <MapPin size={15} />
              {site.location}
            </span>
          </div>
          <div>
            <h3>Discover</h3>
            <Link to="/experiences">Our experiences</Link>
            <Link to="/horse-riding-classes-sharjah">Classes & lessons</Link>
            <Link to="/gallery">Our gallery</Link>
            <Link to="/about">The Sky Stable story</Link>
          </div>
          <div>
            <h3>Equestrian life</h3>
            <Link to="/stable-services">Stable services</Link>
            <Link to="/horse-transport-sharjah">Horse transport</Link>
            <Link to="/horse-trading">Horse trading</Link>
            <Link to="/experiences#packages">Riding packages</Link>
            <Link to="/contact#faq">Your questions, answered</Link>
          </div>
          <div>
            <h3>Let’s talk horses</h3>
            <a href={`tel:${site.callNumber}`}>{site.displayPhone}</a>
            <a
              href={whatsappUrl(
                "Hello Sky Stable! I would like to make an enquiry.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <ArrowUpRight size={13} />
            </a>
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
              Find us in Sharjah <ArrowUpRight size={13} />
            </a>
            {Object.entries(site.socials)
              .filter(([, url]) => url)
              .map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </a>
              ))}
            {site.openingHours && <p>{site.openingHours}</p>}
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/photography">Photography credits</Link>
          </div>
          <p>Made for the moments outside.</p>
        </div>
        <div className="shell demo-note">
          Illustrative stock and AI-generated imagery. Images do not depict Sky
          Stable’s horses, team or facilities.
        </div>
      </footer>
      <nav className="floating-contact" aria-label="Quick contact">
        <a
          className="floating-call"
          href={`tel:${site.callNumber}`}
          aria-label="Call Sky Stable"
          title="Call Sky Stable"
        >
          <Phone aria-hidden="true" />
        </a>
        <a
          className="floating-chat"
          href={whatsappUrl(
            "Hello Sky Stable! I would like to enquire about a ride.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Sky Stable"
          title="WhatsApp Sky Stable"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"
            />
          </svg>
        </a>
      </nav>
    </>
  );
}
