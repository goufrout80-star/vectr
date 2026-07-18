"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

const industries = ["Nuclear", "Gas", "Data Centers", "Semiconductors", "Other"];

export function CrewRequestForm() {
  const [industry, setIndustry] = useState("Nuclear");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "crew-request", industry, ...values }) });
      if (!response.ok) throw new Error("submit"); setStatus("success");
    } catch { setStatus("error"); }
  }

  if (status === "success") return <div className="crew-success"><i><Check size={24}/></i><span>Request received</span><h2>The mobilization brief is in.</h2><p>Our operations team will review your scope and contact you directly.</p></div>;

  return (
    <form className="crew-form" onSubmit={submit}>
      <div className="field-grid"><label><span>First name *</span><input name="firstName" required autoComplete="given-name"/></label><label><span>Last name *</span><input name="lastName" required autoComplete="family-name"/></label><label><span>Company name *</span><input name="company" required autoComplete="organization"/></label><label><span>Work email *</span><input name="email" type="email" required autoComplete="email"/></label><label><span>Contact number</span><input name="phone" type="tel" autoComplete="tel"/></label><label><span>Site / location</span><input name="location" placeholder="City, state or facility"/></label></div>
      <fieldset><legend>Industry *</legend><div>{industries.map((item) => <label key={item} className={industry === item ? "selected" : ""}><input type="radio" name="industry-choice" checked={industry === item} onChange={() => setIndustry(item)}/><i/><span>{item}</span></label>)}</div></fieldset>
      <label className="scope-field"><span>Scope, craft count and target date</span><textarea name="scope" rows={5} placeholder="Tell us what the schedule needs."/></label>
      <p className="form-privacy">By submitting, you agree that VECTR may use this information to respond to your staffing inquiry. Information is never sold for advertising.</p>
      {status === "error" && <p className="form-error" role="alert">The transmission could not be completed. Please try again.</p>}
      <button className="crew-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Transmitting…" : "Submit request"}<ArrowRight size={17}/></button>
    </form>
  );
}
