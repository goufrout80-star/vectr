import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Capabilities } from "@/components/Capabilities";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { HomeExperience } from "@/components/HomeExperience";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      <HomeExperience />
      <Capabilities />

      <section className="standards-section">
        <Reveal className="standards-image">
          <Image src="/images/editorial/standards.webp" alt="Industrial field professionals coordinating at an energy facility" fill sizes="(max-width: 800px) 100vw, 46vw" />
          <span>ZERO-FAIL / FIELD VERIFIED</span>
        </Reveal>
        <div className="standards-copy">
          <Reveal><p className="micro-label">One standard. Every site.</p><h2>Nuclear-grade standards across every site.</h2></Reveal>
          <Reveal delay={0.08} className="standards-bottom">
            <p>Modeled on nuclear-grade environments, our process enforces badge compliance, protected timelines and zero-error tolerance.</p>
            <Link href="/industries" className="pill-link">Explore our industries <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-title">
          <div>
            <span>Answers / 04</span>
            <h2>How we work and how we deliver industrial-grade staffing.</h2>
          </div>
        </div>
        <Faq />
      </section>

      <section className="home-cta">
        <div className="home-cta-signal" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <Reveal>
          <span>Start the system</span>
          <h2>Staff your outage with fast response, and crews you can rely on.</h2>
          <Link href="/request-crew" className="pill-link pill-link--light">Request crews <ArrowRight size={15} /></Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
