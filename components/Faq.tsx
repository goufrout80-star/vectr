"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const items = [
  {
    question: "How fast can crews be mobilized?",
    answer:
      "We move at the speed of your schedule. One call activates our mobilization engine to source and deploy precision-matched crews in hours, not weeks, while maintaining full verification before dispatch.",
  },
  {
    question: "How do you handle compliance and background checks?",
    answer:
      "Our zero-fail compliance model validates background checks, fitness-for-duty, and site-specific certifications before a worker is released for dispatch. Anyone who is not fully cleared never reaches the gate.",
  },
  {
    question: "What coverage do you provide during outages?",
    answer:
      "Our team coordinates day and night shifts across the full outage craft spectrum. Real-time arrival tracking and active field communication keep every critical path fully manned when conditions change.",
  },
  {
    question: "How is VECTR different from a traditional staffing vendor?",
    answer:
      "Traditional agencies react to openings. VECTR operates as a workforce logistics engine — combining intelligent workflows with expert curation to deliver field-proven crews, not stacks of available resumes.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div className={`faq-item ${open === index ? "faq-item--open" : ""}`} key={item.question}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
            <span>0{index + 1}</span>
            <strong>{item.question}</strong>
            <i aria-hidden="true"><ChevronDown size={16} /></i>
          </button>
          <AnimatePresence initial={false}>
            {open === index && (
              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p>{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
