"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const trades = ["Millwright", "Turbines", "Welder", "Electrician", "Boilermaker", "Other"];
const levels = ["Apprentice", "Journeyman", "Master", "Foreman"];
type Data = { name: string; email: string; phone: string; trade: string; level: string; certifications: string; resumeName: string };
const blank: Data = { name: "", email: "", phone: "", trade: "", level: "", certifications: "", resumeName: "" };

export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(blank);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const restored = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem("vectr-application");
      if (saved) { try { setData({ ...blank, ...JSON.parse(saved) }); } catch {} }
      restored.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (restored.current) localStorage.setItem("vectr-application", JSON.stringify({ ...data, resumeName: "" }));
  }, [data]);

  const set = (key: keyof Data, value: string) => setData((current) => ({ ...current, [key]: value }));
  const valid = [Boolean(data.name && data.email && data.phone), Boolean(data.trade), Boolean(data.level), true, true][step];

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (step < 4) { if (valid) setStep(step + 1); return; }
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "application", ...data }) });
      if (!response.ok) throw new Error("submit");
      localStorage.removeItem("vectr-application"); setStatus("success");
    } catch { setStatus("error"); }
  }

  if (status === "success") return <div className="wizard-success"><i><Check size={24}/></i><span>Application received</span><h2>Thanks, {data.name.split(" ")[0]}.</h2><p>Your field profile is now on our radar. We will be in touch when your experience matches an active deployment.</p></div>;

  return (
    <form className="application-wizard" onSubmit={submit}>
      <div className="wizard-progress"><span>{step + 1} of 5</span><div>{Array.from({ length: 5 }).map((_, index) => <i key={index} className={index <= step ? "active" : ""}/>)}</div></div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div className="wizard-stage" key={step} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }} transition={{ duration: .38, ease: [0.22, 1, 0.36, 1] }}>
          {step === 0 && <><span className="stage-kicker">01 / Your details</span><h3>First, tell us who you are.</h3><div className="field-grid"><label><span>Full name *</span><input required autoFocus value={data.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Full name"/></label><label><span>Email *</span><input required type="email" value={data.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="name@email.com"/></label><label><span>Contact number *</span><input required type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+1 000 000 0000"/></label></div></>}
          {step === 1 && <><span className="stage-kicker">02 / Primary trade &amp; specialty</span><h3>Where do you deliver your best work?</h3><div className="choice-grid">{trades.map((trade) => <label key={trade} className={data.trade === trade ? "selected" : ""}><input type="radio" name="trade" checked={data.trade === trade} onChange={() => set("trade", trade)}/><i>{String(trades.indexOf(trade) + 1).padStart(2, "0")}</i><span>{trade}</span><b><Check size={14}/></b></label>)}</div></>}
          {step === 2 && <><span className="stage-kicker">03 / Experience level</span><h3>How do you operate in the field?</h3><div className="choice-grid choice-grid--levels">{levels.map((level) => <label key={level} className={data.level === level ? "selected" : ""}><input type="radio" name="level" checked={data.level === level} onChange={() => set("level", level)}/><i>{String(levels.indexOf(level) + 1).padStart(2, "0")}</i><span>{level}</span><b><Check size={14}/></b></label>)}</div></>}
          {step === 3 && <><span className="stage-kicker">04 / Your credentials</span><h3>Show us what clears the gate.</h3><div className="credential-grid"><label className="upload-field"><input type="file" accept=".pdf,.doc,.docx" onChange={(e) => set("resumeName", e.target.files?.[0]?.name || "")}/><Upload size={22}/><strong>{data.resumeName || "Upload your resume"}</strong><span>PDF, DOC or DOCX · optional</span></label><label><span>Key certifications · optional</span><textarea rows={7} value={data.certifications} onChange={(e) => set("certifications", e.target.value)} placeholder="List active certifications, clearances and site qualifications"/></label></div></>}
          {step === 4 && <><span className="stage-kicker">05 / Review your details</span><h3>Ready to join the network.</h3><div className="review-grid"><div><span>Contact details</span><strong>{data.name}</strong><p>{data.email}<br/>{data.phone}</p></div><div><span>Primary trade</span><strong>{data.trade}</strong><p>{data.level}</p></div><div><span>Credentials</span><strong>{data.resumeName || "No resume attached"}</strong><p>{data.certifications || "No certifications listed"}</p></div></div><p className="form-privacy">By submitting, you agree that VECTR may use this information to evaluate your application and contact you. Information is never sold for advertising.</p></>}
        </motion.div>
      </AnimatePresence>
      {status === "error" && <p className="form-error" role="alert">The transmission could not be completed. Please try again.</p>}
      <div className="wizard-actions">{step > 0 ? <button type="button" className="wizard-back" onClick={() => setStep(step - 1)}><ArrowLeft size={15}/> Back</button> : <span/>}<button type="submit" disabled={!valid || status === "sending"}>{step === 4 ? status === "sending" ? "Transmitting…" : "Submit application" : "Continue"}<ArrowRight size={16}/></button></div>
    </form>
  );
}
