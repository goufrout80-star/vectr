"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

type Kind = "apply" | "crews";

const sectors = ["Nuclear", "Gas turbines", "Data centers", "Semiconductors"];

export function InquiryForm({ kind }: { kind: Kind }) {
  const [submitted, setSubmitted] = useState(false);
  const [sector, setSector] = useState("Nuclear");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="form-shell">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            className="form-success"
            key="success"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span><Check size={22} /></span>
            <p className="eyebrow">Transmission received</p>
            <h2>{kind === "apply" ? "You&apos;re on our radar." : "Mobilization starts here."}</h2>
            <p>
              {kind === "apply"
                ? "Your field profile has been recorded. A VECTR specialist will contact you when your experience matches an active deployment."
                : "Your staffing requirements have been recorded. Our operations team will review the scope and contact you directly."}
            </p>
            <button type="button" className="text-link" onClick={() => setSubmitted(false)}>
              Submit another response <ArrowRight size={14} />
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <fieldset className="sector-fieldset">
              <legend>Sector</legend>
              <div>
                {sectors.map((item) => (
                  <label key={item} className={sector === item ? "selected" : ""}>
                    <input
                      type="radio"
                      name="sector"
                      value={item}
                      checked={sector === item}
                      onChange={() => setSector(item)}
                    />
                    <i />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-grid">
              <label>
                <span>{kind === "apply" ? "Full name" : "Contact name"}</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
              </label>
              <label>
                <span>Work email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="name@company.com" />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" required autoComplete="tel" placeholder="+1 000 000 0000" />
              </label>
              <label>
                <span>{kind === "apply" ? "Primary craft" : "Company"}</span>
                <input
                  name="company_or_craft"
                  type="text"
                  required
                  placeholder={kind === "apply" ? "e.g. Millwright" : "Company name"}
                />
              </label>
              {kind === "crews" && (
                <>
                  <label>
                    <span>Crew count</span>
                    <input name="count" type="number" required min="1" placeholder="00" />
                  </label>
                  <label>
                    <span>Target start date</span>
                    <input name="date" type="date" required />
                  </label>
                </>
              )}
            </div>

            <label className="message-field">
              <span>{kind === "apply" ? "Experience and certifications" : "Scope and requirements"}</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={
                  kind === "apply"
                    ? "Tell us about your field experience, certifications, and availability."
                    : "Crafts required, site location, shifts, duration, and any gate requirements."
                }
              />
            </label>

            <label className="consent-field">
              <input type="checkbox" required />
              <i><Check size={11} /></i>
              <span>I agree to VECTR&apos;s privacy policy and consent to being contacted about this request.</span>
            </label>

            <button type="submit" className="form-submit">
              <span>{kind === "apply" ? "Submit application" : "Activate request"}</span>
              <ArrowRight size={17} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
