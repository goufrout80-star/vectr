import type { Metadata } from "next";
import { CrewRequestForm } from "@/components/CrewRequestForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Request Crews", description: "Activate a verified industrial workforce for your critical schedule." };

export default function RequestCrewPage() {
  return (
    <main className="request-page">
      <section className="request-layout">
        <div className="request-intro"><span>Activate / 24—7</span><h1>Request Crews</h1><div><h2>Critical outages don&apos;t wait.</h2><p>Contact VECTR 24/7 to mobilize a specialized team to your site immediately.</p><small>One scope. One operating team. No handoffs.</small></div></div>
        <div className="request-form-wrap"><span>Tell us your scope;<br/>we&apos;ll handle the scale.</span><CrewRequestForm/></div>
      </section>
      <Footer />
    </main>
  );
}
