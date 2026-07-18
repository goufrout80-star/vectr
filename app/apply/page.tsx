import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { InnerHero } from "@/components/InnerHero";

export const metadata: Metadata = {
  title: "Apply",
  description: "Join VECTR's network of field-proven industrial professionals.",
};

export default function ApplyPage() {
  return (
    <main className="inner-page form-page">
      <InnerHero
        eyebrow="Field network / Apply"
        title={<>Get on<br />our radar</>}
        description="Tell us where you have delivered, what you are cleared to do, and when you are ready to move. We match proven craft with the work that fits."
      />
      <section className="form-section">
        <div className="form-intro">
          <p className="eyebrow">Field profile</p>
          <h2>Built for people who know the work.</h2>
          <p>Applications are reviewed by real operations specialists. Clear information helps us match you faster when a relevant deployment opens.</p>
        </div>
        <InquiryForm kind="apply" />
      </section>
      <Footer />
    </main>
  );
}
