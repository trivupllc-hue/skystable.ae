import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import { gallery, galleryCategories } from "../data/content";
import { Photo, SectionTitle } from "./ui";
export function GalleryPreview() {
  return (
    <section className="gallery-preview section">
      <div className="shell">
        <div className="section-heading-row">
          <SectionTitle
            eyebrow="A GLIMPSE OF THE FEELING"
            title={
              <>
                Less scrolling.
                <br />
                <em>More living.</em>
              </>
            }
            light
          />
          <Link className="button button-glass" to="/gallery">
            Explore the Gallery
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="gallery-preview-grid">
          {gallery.slice(0, 4).map((g, i) => (
            <Link
              to="/gallery"
              key={g.id}
              className={`preview-photo preview-photo-${i}`}
            >
              <Photo name={g.id} alt={`${g.alt} — illustrative stock photo`} />
              <span>
                {g.title}
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
        <p className="image-note">
          Illustrative stock photography. A window into the equestrian world,
          not Sky Stable’s actual facilities.
        </p>
      </div>
    </section>
  );
}
export function GalleryPage() {
  const [category, setCategory] = useState("All Moments");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const start = useRef<number | null>(null);
  const images = gallery.filter(
    (g) => category === "All Moments" || g.category === category,
  );
  useEffect(() => {
    if (active !== null) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    dialog.current?.close();
    trigger.current?.focus();
  }, [active]);
  const move = (direction: number) =>
    setActive((value) =>
      value === null
        ? null
        : (value + direction + images.length) % images.length,
    );
  const current = active === null ? null : images[active];
  return (
    <>
      <section className="gallery-heading shell">
        <p className="eyebrow">THE WORLD LOOKS DIFFERENT FROM HERE</p>
        <h1>
          Moments worth
          <br />
          <em>stepping outside for.</em>
        </h1>
        <p>
          A collection of equestrian inspiration. All images are licensed
          illustrative stock photography and do not depict Sky Stable horses,
          riders or facilities.
        </p>
        <div className="gallery-filters" aria-label="Filter photography">
          {galleryCategories.map((c) => (
            <button
              key={c}
              className={c === category ? "active" : ""}
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      <section
        className="shell gallery-masonry"
        aria-label={`${category} gallery`}
      >
        {images.map((g, i) => (
          <button
            key={g.id}
            className="gallery-tile"
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setActive(i);
            }}
            aria-label={`View ${g.title}`}
          >
            <Photo name={g.id} alt={`${g.alt} — illustrative stock photo`} />
            <span>
              <span>
                <small>{g.category}</small>
                {g.title}
              </span>
              <Maximize2 size={20} />
            </span>
          </button>
        ))}
      </section>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Photography lightbox"
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <button
          className="lightbox-close icon-button"
          onClick={() => setActive(null)}
          aria-label="Close image"
        >
          <X />
        </button>
        {current && (
          <>
            <button
              className="lightbox-prev icon-button"
              aria-label="Previous image"
              onClick={() => move(-1)}
            >
              <ChevronLeft />
            </button>
            <figure
              onTouchStart={(e) => {
                start.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (start.current !== null) {
                  const delta = e.changedTouches[0].clientX - start.current;
                  if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
                  start.current = null;
                }
              }}
            >
              <img
                src={`/images/${current.id}-1200.webp`}
                alt={`${current.alt} — illustrative stock photo`}
              />
              <figcaption aria-live="polite">
                {current.title}{" "}
                <span>
                  {(active ?? 0) + 1} / {images.length} · Illustrative stock
                  photograph
                </span>
              </figcaption>
            </figure>
            <button
              className="lightbox-next icon-button"
              aria-label="Next image"
              onClick={() => move(1)}
            >
              <ChevronRight />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
