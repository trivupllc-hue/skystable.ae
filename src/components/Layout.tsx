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
            <Link to="/horse-riding-classes-sharjah">Riding lessons</Link>
            <Link to="/gallery">Our gallery</Link>
            <Link to="/about">The Sky Stable story</Link>
          </div>
          <div>
            <h3>Equestrian life</h3>
            <Link to="/stable-services">Stable services</Link>
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
      <a
        className="floating-whatsapp"
        href={whatsappUrl(
          "Hello Sky Stable! I would like to enquire about a ride.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sky Stable on WhatsApp"
      >
        <MessageCircle size={25} />
        <span>Let’s plan your ride</span>
      </a>
      <div className="mobile-booking">
        <a href={`tel:${site.callNumber}`}>
          <Phone size={18} />
          Call
        </a>
        <a
          href={whatsappUrl(
            "Hello Sky Stable! I would like to enquire about a ride.",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <Link to="/book">
          <CalendarDays size={18} />
          Book Now
        </Link>
      </div>
    </>
  );
}
