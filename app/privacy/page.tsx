import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 18, 2026">
      <h2>Information we collect</h2>
      <p>When you submit an application or crew request, VECTR may collect the contact, professional, and operational information you provide. We use this information only to assess staffing fit, respond to requests, coordinate deployments, and improve our services.</p>
      <h2>How information is used</h2>
      <p>Information may be reviewed by authorized operations personnel and service providers supporting secure communications, screening, and deployment workflows. We do not sell personal information.</p>
      <h2>Data security and retention</h2>
      <p>We apply reasonable administrative and technical safeguards and retain information only for legitimate operational, legal, or compliance purposes.</p>
      <h2>Your choices</h2>
      <p>You may request access, correction, or deletion of your information by contacting VECTR. Certain records may be retained where required for safety, compliance, or legal obligations.</p>
    </LegalPage>
  );
}
