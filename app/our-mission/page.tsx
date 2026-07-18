import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { InnerHero } from "@/components/InnerHero";
import { MissionChapters } from "@/components/MissionChapters";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Our Mission", description: "Operational velocity for the infrastructure that cannot wait." };

export default function MissionPage() {
  return (
    <main className="inner-page mission-page">
      <InnerHero eyebrow="Our mission / 02" title={<>Operational<br/>Velocity</>} description="Every day critical infrastructure sits idle or under-staffed drains capital. VECTR cuts traditional workforce mobilization timelines by 70%, deploying certified technical crews before delay can hit the bottom line."/>
      <section className="inner-feature-image inner-feature-image--blue"><Image src="/images/velocity-blue.webp" alt="Blue operational velocity visualization" fill priority sizes="100vw"/><span>SIGNAL / SPEED / CONTROL</span></section>
      <section className="mission-cost">
        <Reveal><span>The operating reality / 01</span><h2>The Real Cost of an Empty Job Site</h2></Reveal>
        <Reveal delay={.08}><p>On a critical project, an unfilled role is not an HR problem. It is a financial leak—idle equipment, missed milestones, liquidated damages and experienced people waiting on the one skill the schedule still needs.</p><div><strong>70%</strong><span>shorter mobilization timeline</span></div></Reveal>
      </section>
      <MissionChapters />
      <section className="mission-statement"><Reveal><span>The bridge / 04</span><h2>We are the bridge between digital intelligence and the real-world infrastructure it takes to keep everything moving.</h2></Reveal></section>
      <ClosingCta title="Move at the speed of the schedule."/>
      <Footer />
    </main>
  );
}
