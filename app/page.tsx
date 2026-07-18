import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Crosshair, ScanSearch, Zap } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { HomeExperience } from "@/components/HomeExperience";
import { Reveal } from "@/components/Reveal";
import { SectionArrow } from "@/components/SectionArrow";

const capabilities = [
  {
    number: "01",
    icon: Zap,
    title: "Rapid activation",
    text: "Machine intelligence turns staffing into instant logistics — deploying precisely matched crews the moment demand strikes.",
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "Rigorous selection",
    text: "Qualified local talent is ranked by distance, field performance, skill, and total mobilization cost before human review.",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Verified before arrival",
    text: "Automated compliance gates block dispatch until every background check, certification, and fitness requirement is clear.",
  },
  {
    number: "04",
    icon: Crosshair,
    title: "Controlled outcomes",
    text: "Cost, compliance, and crew readiness are managed before dispatch so uncertainty never reaches the field.",
  },
];

export default function Home() {
  return (
    <main>
      <HomeExperience />

      <section className="editorial-section capabilities-section">
        <Reveal className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Built for consequence</p>
            <h2>
              Designed for today&apos;s operations,
              <br />
              beyond legacy staffing workflows.
            </h2>
          </div>
          <p>
            VECTR turns workforce demand into a controlled operational sequence — fast enough for the schedule, rigorous enough for the gate.
          </p>
        </Reveal>

        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="capability-card" delay={index * 0.06} key={item.title}>
                <div className="capability-meta">
                  <span>{item.number}</span>
                  <Icon size={27} strokeWidth={1.45} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <i />
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="standards-section">
        <div className="standards-image">
          <Image
            src="/images/industrial-grid.webp"
            alt="Field technicians coordinating at a high-voltage energy facility"
            fill
            sizes="100vw"
            priority={false}
          />
          <div className="image-scanline" />
          <span className="image-coordinate">34.4215° N / 119.6982° W</span>
        </div>
        <div className="standards-copy">
          <Reveal>
            <p className="eyebrow">Zero-error tolerance</p>
            <h2>
              Nuclear-grade standards
              <br />
              across every site.
            </h2>
          </Reveal>
          <Reveal className="standards-aside" delay={0.08}>
            <SectionArrow />
            <p>
              Modeled on nuclear-grade environments, our process enforces badge compliance, protected timelines, and accountable arrival.
            </p>
            <Link href="/industries" className="text-link">
              Explore our industries <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="industries-band" aria-label="Industries served">
        <div className="marquee-row">
          <div>
            <span>Nuclear power</span><i />
            <span>Gas turbines</span><i />
            <span>Data centers</span><i />
            <span>Semiconductors</span><i />
            <span>Nuclear power</span><i />
            <span>Gas turbines</span><i />
            <span>Data centers</span><i />
            <span>Semiconductors</span><i />
          </div>
        </div>
      </section>

      <section className="editorial-section faq-section">
        <Reveal className="section-heading section-heading--split faq-heading">
          <div>
            <p className="eyebrow">Field notes / 04</p>
            <h2>
              How we work and how we deliver
              <br />
              industrial-grade staffing.
            </h2>
          </div>
          <SectionArrow />
        </Reveal>
        <Faq />
      </section>

      <section className="cta-section">
        <div className="cta-grid" aria-hidden="true" />
        <Reveal>
          <p className="eyebrow">Ready when the schedule moves</p>
          <h2>
            Staff your outage with fast response,
            <br />
            and crews you can rely on.
          </h2>
          <Link href="/request-crews" className="button button--light button--large">
            Request crews <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
