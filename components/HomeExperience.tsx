"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowDown, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const IndustrialWorld = dynamic(() => import("./IndustrialWorld"), {
  ssr: false,
  loading: () => (
    <div className="world-fallback">
      <LoaderCircle size={22} />
    </div>
  ),
});

const steps = [
  {
    number: "01",
    title: "Activation, simplified",
    text: "One call triggers mobilization. Your craft, count, and start date route directly to verified crews — no hand-offs, no escalation loops.",
  },
  {
    number: "02",
    title: "Cleared to count",
    text: "Screening and verification happen before dispatch. Compliance, background, certifications, and fitness-for-duty follow a zero-fail model.",
  },
  {
    number: "03",
    title: "Proven field match",
    text: "Selection is driven by field performance, reliability, and role fit — crews engineered to hold the critical path from first break to completion.",
  },
  {
    number: "04",
    title: "Seamless arrival",
    text: "We manage the last mile with finalized reporting details, real-time arrival monitoring, and active coordination for every shift.",
  },
];

export function HomeExperience() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const processOpacity = useTransform(scrollYProgress, [0.13, 0.2, 0.88, 0.97], [0, 1, 1, 0]);
  const heroExit = Math.max(0, Math.min(1, (progress - 0.09) / 0.09));

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 1350);
    return () => window.clearTimeout(timeout);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
    const next = Math.max(0, Math.min(3, Math.floor((latest - 0.16) / 0.205)));
    setActive(next);
  });

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, clipPath: "polygon(0 0,100% 0,100% 0,0 100%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="preloader-orbit preloader-orbit--one" />
            <div className="preloader-orbit preloader-orbit--two" />
            <div className="pixel-mark" aria-label="Loading VECTR">
              <i /><i /><i /><i /><i /><i /><i />
            </div>
            <span>Mobilizing systems</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section ref={section} className="world-scroll" aria-label="VECTR mobilization process">
        <div className="world-sticky">
          <div className="world-canvas" aria-hidden="true">
            <IndustrialWorld progress={progress} active={active} />
          </div>
          <div className="world-vignette" />

          <motion.div
            className="hero-copy"
            style={{ opacity: 1 - heroExit, y: -90 * heroExit, x: "-50%" }}
          >
            <p className="eyebrow">Precision workforce logistics</p>
            <h1>
              From call
              <br />
              to crew
            </h1>
            <p className="hero-deck">
              AI-driven speed. Expert curation.
              <br />
              Verified crews mobilized to protect your schedule and your bottom line.
            </p>
            <a href="#process" className="scroll-cue">
              <span>Scroll to discover our process</span>
              <ArrowDown size={13} />
            </a>
          </motion.div>

          <motion.div id="process" className="process-panel" style={{ opacity: processOpacity }}>
            <div className="process-list" aria-label="Process stages">
              {steps.map((step, index) => (
                <button
                  type="button"
                  key={step.number}
                  className={active === index ? "active" : ""}
                  onClick={() => {
                    if (!section.current) return;
                    const scrollable = section.current.offsetHeight - window.innerHeight;
                    window.scrollTo({
                      top: section.current.offsetTop + scrollable * (0.22 + index * 0.205),
                      behavior: "smooth",
                    });
                  }}
                >
                  <span>{step.number}</span>
                  <b>{step.title}</b>
                </button>
              ))}
            </div>

            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="process-detail"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{steps[active].number}</span>
                <h2>{steps[active].title}</h2>
                <p>{steps[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="progress-rail" aria-hidden="true">
            <motion.i style={{ scaleY: scrollYProgress }} />
          </div>
        </div>
      </section>
    </>
  );
}
