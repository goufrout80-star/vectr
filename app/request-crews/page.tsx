import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { InnerHero } from "@/components/InnerHero";

export const metadata: Metadata = {
  title: "Request crews",
  description: "Activate VECTR's precision workforce mobilization system.",
};

export default function RequestCrewsPage() {
  return (
    <main className="inner-page form-page request-page">
      <InnerHero
        eyebrow="Mobilization / Request"
        title={<>Request<br />Crews</>}
        description="Give us the craft, count, location, and start date. Our operations team will map the requirements and begin precision mobilization."
      />
      <section className="form-section">
        <div className="form-intro">
          <p className="eyebrow">Operational brief</p>
          <h2>One call starts the system.</h2>
          <p>Share the known scope. We will clarify the rest, validate the deployment path, and coordinate every step through arrival.</p>
        </div>
        <InquiryForm kind="crews" />
      </section>
      <Footer />
    </main>
  );
}
