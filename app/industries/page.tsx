import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { IndustryChapters } from "@/components/IndustryChapters";
import { InnerHero } from "@/components/InnerHero";

export const metadata: Metadata = { title: "Our Industries", description: "Verified technical crews for nuclear, gas, data center, and semiconductor operations." };

export default function IndustriesPage() {
  return (
    <main className="inner-page industries-page">
      <InnerHero eyebrow="Our industries / 01" title={<>Staffing the World&apos;s<br/>Critical Systems</>} description="From nuclear outages to advanced manufacturing, VECTR mobilizes field-validated specialists for environments where workforce readiness protects uptime, compliance and the critical path."/>
      <section className="inner-feature-image"><Image src="/images/editorial/nuclear.webp" alt="Technical workforce inside a critical power facility" fill priority sizes="100vw"/><span>FIELD SYSTEMS // 01—04</span></section>
      <IndustryChapters />
      <ClosingCta title="Bring the right crew to the gate—ready."/>
      <Footer />
    </main>
  );
}
