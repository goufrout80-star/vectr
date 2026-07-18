"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    title: "Rapid Activation",
    text: "Speed is a skill. Intelligent workflows turn demand into instant logistics, activating precisely matched crews the moment the schedule moves.",
  },
  {
    title: "Rigorous Selection",
    text: "Qualified talent is ranked by radius, trade, field performance, availability and mobilization cost before expert human review.",
  },
  {
    title: "100% Verified Before Arrival",
    text: "Background, fitness-for-duty and site-specific credentials are validated before dispatch. If the gate is not clear, the worker does not move.",
  },
  {
    title: "Controlled Outcomes",
    text: "Cost, compliance, crew readiness and arrival are managed as one system so uncertainty never reaches the critical path.",
  },
];

function SystemIcon({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 180 120" aria-hidden="true"><path d="M14 82h35V48h37V23h36v52h44"/><path d="M31 99 58 72l22 19 41-42 26 24"/><circle cx="147" cy="73" r="8"/></svg>;
  if (index === 1) return <svg viewBox="0 0 180 120" aria-hidden="true"><circle cx="76" cy="58" r="31"/><circle cx="76" cy="58" r="15"/><path d="m98 82 29 29M14 58h25M113 58h53M76 11v16M76 89v20"/><path d="m132 25 9 9-18 18"/></svg>;
  if (index === 2) return <svg viewBox="0 0 180 120" aria-hidden="true"><path d="M21 19h96v81H21z"/><path d="M37 38h64M37 53h41M37 68h53"/><path d="m111 73 18 19 34-45"/><circle cx="145" cy="73" r="28"/></svg>;
  return <svg viewBox="0 0 180 120" aria-hidden="true"><path d="M14 92h152M25 92V54l30-17v55M55 92V25l35 15v52M90 92V55l31-16v53M121 92V64l32-17v45"/><path d="M35 67h10M67 54h11M102 69h9M135 74h8"/></svg>;
}

function CapabilityCard({ item, index, progress }: { item: (typeof items)[number]; index: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const start = index * 0.18 + 0.08;
  const opacity = useTransform(progress, [start, start + 0.12], [0.16, 1]);
  const y = useTransform(progress, [start, start + 0.12], [48, 0]);
  return (
    <motion.article style={{ opacity, y }}>
      <span>0{index + 1}</span>
      <SystemIcon index={index} />
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </motion.article>
  );
}

export function Capabilities() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  return (
    <section ref={section} className="capabilities-scroll">
      <div className="capabilities-sticky">
        <div className="capabilities-heading">
          <span>Operating system / 04</span>
          <h2>Designed for today&apos;s operations,<br />beyond legacy staffing workflows.</h2>
        </div>
        <div className="capabilities-grid">
          {items.map((item, index) => <CapabilityCard key={item.title} item={item} index={index} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
