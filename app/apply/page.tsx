import type { Metadata } from "next";
import Image from "next/image";
import { ApplicationWizard } from "@/components/ApplicationWizard";
import { Footer } from "@/components/Footer";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Apply", description: "Join VECTR's network of field-proven industrial professionals." };

const reasons = [
  { title: "The search never stops", text: "We do not wait for an outage to start looking. Whether you are available now or committed for six months, we want to know who you are.", image: "/images/editorial/data-center.webp" },
  { title: "Skill is our currency", text: "In nuclear, gas and critical infrastructure, precision is not optional. Talent, experience and active credentials come first.", image: "/images/editorial/gas.webp" },
  { title: "An open door for professionals", text: "This is an entry into a premier talent pool, built to connect proven craft with high-value work when the timing is right.", image: "/images/editorial/standards.webp" },
];

export default function ApplyPage() {
  return (
    <main className="inner-page apply-page">
      <InnerHero eyebrow="Join the network / 03" title={<>Great projects rely<br/>on great people.</>} description="We continuously source top industry talent, from engineers to precision millwrights. When work begins, the right team should already be in place."/>
      <a className="apply-jump" href="#apply-now">Apply now to VECTR</a>
      <section className="apply-reasons">{reasons.map((item, index) => <Reveal key={item.title} className="apply-reason"><div className="apply-reason-image"><Image src={item.image} alt="Industrial professional environment" fill sizes="(max-width: 800px) 100vw, 33vw"/></div><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.text}</p></Reveal>)}</section>
      <section id="apply-now" className="application-section"><div className="application-intro"><span>Get on our radar</span><h2>Introduce yourself to the network.</h2><p>Every profile is reviewed by operations specialists and matched against upcoming field demand.</p></div><ApplicationWizard/></section>
      <Footer />
    </main>
  );
}
