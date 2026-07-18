import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our industries",
  description: "Verified crews for nuclear, gas, data center, and semiconductor operations.",
};

const industries = [
  {
    number: "01",
    title: "Nuclear power",
    tag: "Outages / Maintenance / Compliance",
    text: "Badge-ready, fitness-for-duty verified craft mobilized for zero-error environments and schedule-critical outage work.",
  },
  {
    number: "02",
    title: "Gas turbines",
    tag: "Install / Repair / Turnaround",
    text: "Field-proven mechanical and technical crews built for compressed mobilization windows and high-tempo turbine work.",
  },
  {
    number: "03",
    title: "Data centers",
    tag: "Construction / Commissioning / Operations",
    text: "Qualified personnel for uptime-sensitive builds, commissioning programs, and mission-critical facility operations.",
  },
  {
    number: "04",
    title: "Semiconductors",
    tag: "Fab / Cleanroom / Advanced manufacturing",
    text: "Precision staffing for controlled environments where certifications, protocol discipline, and reliability are non-negotiable.",
  },
];

export default function IndustriesPage() {
  return (
    <main className="inner-page">
      <InnerHero
        eyebrow="Our industries / 01"
        title={<>Staffing the World&apos;s<br />Critical Systems</>}
        description="We specialize in high-stakes environments where workforce readiness protects uptime, compliance, and the economics of the critical path."
      />

      <section className="feature-image feature-image--industry">
        <Image
          src="/images/industrial-grid.webp"
          alt="Energy infrastructure and technical field crew"
          fill
          priority
          sizes="100vw"
        />
        <div className="feature-image-label">
          <span>FIELD SYSTEMS // 01</span>
          <p>Where operational readiness matters most.</p>
        </div>
      </section>

      <section className="industry-list">
        {industries.map((item) => (
          <Reveal className="industry-row" key={item.number}>
            <div className="industry-number">{item.number}</div>
            <div>
              <p>{item.tag}</p>
              <h2>{item.title}</h2>
            </div>
            <p>{item.text}</p>
            <Link href="/request-crews" aria-label={`Request ${item.title} crews`}>
              <ArrowUpRight size={20} />
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="coverage-section">
        <Reveal>
          <p className="eyebrow">Coverage matrix</p>
          <h2>One operating standard.<br />Every critical environment.</h2>
        </Reveal>
        <div className="coverage-table">
          <div><span>Pre-dispatch verification</span><b>Included</b></div>
          <div><span>Site-specific certification review</span><b>Included</b></div>
          <div><span>Real-time arrival coordination</span><b>Included</b></div>
          <div><span>Day / night shift coverage</span><b>24 / 7</b></div>
          <div><span>Human field-fit review</span><b>Every crew</b></div>
        </div>
      </section>

      <section className="inner-cta">
        <h2>Bring the right crew to the gate — ready.</h2>
        <Link href="/request-crews" className="button button--dark button--large">
          Request crews <ArrowUpRight size={16} />
        </Link>
      </section>
      <Footer />
    </main>
  );
}
