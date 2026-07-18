"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const chapters = [
  {
    number: "01", label: "The Friction", image: "/images/editorial/nuclear.webp", imageAlt: "Critical industrial turbine infrastructure",
    title: "Hidden cost of “the middleman”: a systemic inefficiency",
    intro: "Traditional staffing layers distance between the site and the people who can protect its schedule. Every handoff slows validation, obscures cost and compounds risk.",
    points: [
      ["Zero “Rolodex” Guesswork", "Demand is matched against verified field history and current readiness—not a stack of stale resumes."],
      ["Direct Access with No Layering", "Requirements move directly from operations to the people responsible for mobilization."],
      ["Predictive Crew Pipeline", "Future demand signals begin qualification before the outage becomes urgent."],
    ],
  },
  {
    number: "02", label: "The VECTR Engine", image: "/images/velocity-blue.webp", imageAlt: "Abstract blue operational system",
    title: "Precision through automation",
    intro: "The VECTR engine turns fragmented sourcing, validation and deployment into a single controlled workflow—then puts expert judgment at the decisions that matter.",
    points: [
      ["Identify Signals", "Scope, location, craft, count and start date become a precise deployment profile."],
      ["Automate Validation", "Credentials, fitness-for-duty and site requirements move through one zero-fail gate."],
      ["Instant Deployment", "Cleared workers receive coordinated reporting details and live arrival support."],
    ],
  },
  {
    number: "03", label: "The Outcome", image: "/images/editorial/standards.webp", imageAlt: "Industrial field team coordinating",
    title: "Engineered for execution",
    intro: "The result is not more recruiting activity. It is predictable field capacity, protected margins and a workforce that arrives ready to perform.",
    points: [
      ["Shield Your Margins", "Prioritize qualified local talent and remove avoidable vendor layers before mobilization."],
      ["Protect Critical Timelines", "Track verification and arrival as operating variables, not administrative afterthoughts."],
      ["Pay for Value, Not Overhead", "Spend follows deployed capability instead of traditional agency friction."],
    ],
  },
];

export function MissionChapters() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  return (
    <section className="mission-engine">
      <div className="mission-tabs" role="tablist" aria-label="Mission chapters">
        {chapters.map((item, index) => <button key={item.number} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{item.number}</span><strong>{item.label}</strong><i><ArrowRight size={16}/></i></button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.article key={chapter.number} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mission-chapter-image"><Image src={chapter.image} alt={chapter.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw"/></div>
          <div className="mission-chapter-copy"><span>{chapter.number} / 03 — {chapter.label}</span><h3>{chapter.title}</h3><p>{chapter.intro}</p></div>
          <div className="mission-points">{chapter.points.map(([title, text], index) => <div key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{text}</p></div>)}</div>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
