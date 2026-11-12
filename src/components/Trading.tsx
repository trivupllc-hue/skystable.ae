import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { horses } from "../data/horses";
import {
  sellerMessage,
  sellerSchema,
  whatsappUrl,
  type SellerValues,
} from "../lib/booking";
import { PageIntro } from "../pages";
import { BookButton, SectionTitle, WhatsApp } from "./ui";
export function TradingPage() {
  const [url, setUrl] = useState("");
  const success = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerValues>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: "",
      phone: "",
      horseName: "",
      breed: "",
      age: "",
      gender: "Mare",
      training: "",
      location: "",
      price: "",
      notes: "",
    },
  });
  useEffect(() => {
    if (url) {
      success.current?.focus();
      success.current?.scrollIntoView({ block: "center" });
    }
  }, [url]);
  const fields: {
    key: keyof SellerValues;
    label: string;
    optional?: boolean;
    type?: string;
  }[] = [
    { key: "name", label: "Your full name" },
    { key: "phone", label: "Phone with country code", type: "tel" },
    { key: "horseName", label: "Horse’s name" },
    { key: "breed", label: "Breed" },
    { key: "age", label: "Age" },
    { key: "location", label: "Horse’s location" },
    { key: "training", label: "Training level" },
    { key: "price", label: "Asking price and currency", optional: true },
  ];
  return (
    <>
      <PageIntro
        eyebrow="HORSE TRADING · UAE"
        title="Every partnership has a beginning."
        description="Enquiries for buying and selling horses. Start a conversation about your next chapter."
        image="horse"
      />
      <section className="section shell">
        <div className="section-heading-row">
          <SectionTitle
            eyebrow="FIND YOUR PARTNER"
            title={
              <>
                Horses <em>for sale.</em>
              </>
            }
          />
          <BookButton service="Horse Buying Enquiry" className="button-dark">
            Make a Buying Enquiry
          </BookButton>
        </div>
        {horses.length ? (
          <div className="three-grid horse-listings">
            {horses.map((h) => (
              <article key={h.id}>
                <img
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <h3>{h.name}</h3>
                <p>{h.description}</p>
                <dl>
                  {[
                    ["Breed", h.breed],
                    ["Age", h.age],
                    ["Gender", h.gender],
                    ["Training", h.training],
                    ["Location", h.location],
                    ["Price", h.price || "Request price"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <WhatsApp
                  message={`Hello Sky Stable, I am enquiring about ${h.name} (listing ${h.id}). Please share details and viewing arrangements.`}
                >
                  Enquire on WhatsApp
                </WhatsApp>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-listings">
            <span className="line-horse">◇</span>
            <h3>The right horse is worth a conversation.</h3>
            <p>
              There are currently no published horse listings. Tell us your
              preferred breed, experience level and what you’re looking for, and
              ask about current opportunities.
            </p>
            <BookButton
              service="Horse Buying Enquiry"
              className="button-outline"
            >
              Tell Us What You’re Looking For
            </BookButton>
          </div>
        )}
      </section>
      <section id="sell" className="section cream-section">
        <div className="shell selling-grid">
          <div>
            <SectionTitle
              eyebrow="A NEW CHAPTER"
              title={
                <>
                  Thinking of
                  <br />
                  <em>selling your horse?</em>
                </>
              }
            />
            <p>
              Share a few details to start the conversation. The team will
              discuss the next steps, any support offered and how to provide
              photographs and documents.
            </p>
            <ul className="service-points">
              <li>
                <Check />
                Horse details go into your WhatsApp message.
              </li>
              <li>
                <Check />
                Photos can be shared directly in WhatsApp.
              </li>
              <li>
                <Check />
                Submitting an enquiry does not publish a listing.
              </li>
            </ul>
          </div>
          <div className="seller-form">
            {url ? (
              <div ref={success} tabIndex={-1} role="status">
                <MessageCircle />
                <h2>Your enquiry is ready.</h2>
                <p>
                  Open WhatsApp and tap Send. Your horse has not been listed;
                  the team will reply to discuss the next steps.
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  Continue to WhatsApp
                  <ArrowUpRight size={17} />
                </a>
                <button className="text-button" onClick={() => setUrl("")}>
                  Edit enquiry
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit((v) => {
                  const link = whatsappUrl(sellerMessage(v));
                  setUrl(link);
                  window.open(link, "_blank", "noopener,noreferrer");
                })}
              >
                <div className="form-grid">
                  {fields.map((f) => (
                    <label key={f.key}>
                      {f.label}
                      {f.optional ? " (optional)" : " *"}
                      <input
                        type={f.type || "text"}
                        {...register(f.key)}
                        aria-invalid={!!errors[f.key]}
                        aria-describedby={
                          errors[f.key] ? `sell-${f.key}-error` : undefined
                        }
                      />
                      {errors[f.key] && (
                        <span
                          id={`sell-${f.key}-error`}
                          className="field-error"
                          role="alert"
                        >
                          {errors[f.key]?.message}
                        </span>
                      )}
                    </label>
                  ))}
                  <label>
                    Gender *
                    <select {...register("gender")}>
                      <option>Mare</option>
                      <option>Stallion</option>
                      <option>Gelding</option>
                    </select>
                  </label>
                </div>
                <label>
                  Additional details (optional)
                  <textarea
                    rows={4}
                    maxLength={1500}
                    {...register("notes")}
                    aria-invalid={!!errors.notes}
                  />
                  {errors.notes && (
                    <span className="field-error">{errors.notes.message}</span>
                  )}
                </label>
                <p className="fine-print">
                  Your details are not stored here. Review and send your
                  prepared WhatsApp message to contact Sky Stable.
                </p>
                <button className="button" type="submit">
                  Send Selling Enquiry
                  <ArrowUpRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
