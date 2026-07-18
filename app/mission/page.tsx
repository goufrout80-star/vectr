import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our mission",
  description: "VECTR converts time from a liability into an operational advantage.",
};

const principles = [
  ["01", "Time is infrastructure", "Every hour on the critical path carries financial weight. We treat mobilization speed as an engineered system, not an administrative promise."],
  ["02", "Precision before volume", "The goal is not a larger candidate pool. It is the right field-proven crew, cleared for the exact role and ready for the exact gate."],
  ["03", "Technology, curated", "Automation handles distance, data, and verification at scale. Experienced people make the final judgment where context matters."],
  ["04", "Arrival is the outcome", "A filled role on a spreadsheet is not success. A prepared worker crossing the gate on time is."],
];

export default function MissionPage() {
  return (
    <main className="inner-page">
      <InnerHero
        eyebrow="Our mission / 02"
        title="Operational Velocity"
        description="We convert time from a liability into a competitive advantage. In the capital-intensive worlds of energy and digital infrastructure, time is not just a schedule — it is a financial instrument."
      />

      <section className="feature-image feature-image--blue">
        <Image
          src="/images/velocity-blue.webp"
          alt="Abstract blue channels representing precision and speed"
          fill
          priority
          sizes="100vw"
        />
        <div className="feature-image-label">
          <span>VCTR // 02</span>
          <p>Intelligence moving at infrastructure speed.</p>
        </div>
      </section>

      <section className="mission-statement">
        <Reveal>
          <p className="eyebrow">The operating belief</p>
          <h2>Standing still is the most expensive decision in the field.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            The infrastructure that powers modern life cannot wait on fragmented recruiting workflows. VECTR closes the distance between demand and deployment without trading away verification, accountability, or fit.
          </p>
        </Reveal>
      </section>

      <section className="principles-list">
        {principles.map(([number, title, text]) => (
          <Reveal className="principle-row" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </section>

      <section className="numbers-section">
        <p className="eyebrow">System targets</p>
        <div className="numbers-grid">
          <Reveal><strong>&lt; 1 hr</strong><span>to activate a search</span></Reveal>
          <Reveal delay={0.06}><strong>100%</strong><span>verified before dispatch</span></Reveal>
          <Reveal delay={0.12}><strong>24 / 7</strong><span>active coordination</span></Reveal>
          <Reveal delay={0.18}><strong>0</strong><span>avoidable gate failures</span></Reveal>
        </div>
      </section>

      <section className="inner-cta">
        <h2>Put operational velocity on your critical path.</h2>
        <Link href="/request-crews" className="button button--dark button--large">
          Request crews <ArrowUpRight size={16} />
        </Link>
      </section>
      <Footer />
    </main>
  );
}
