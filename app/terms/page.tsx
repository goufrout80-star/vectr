import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="July 18, 2026">
      <h2>Website use</h2>
      <p>This website provides general information about VECTR&apos;s workforce logistics services. You may not misuse the site, interfere with its operation, or submit false or unauthorized information.</p>
      <h2>No staffing guarantee</h2>
      <p>A website submission does not create an employment relationship, staffing agreement, or guarantee of placement. Engagements are subject to separate verification, scope, commercial terms, and written agreements.</p>
      <h2>Intellectual property</h2>
      <p>The VECTR name, design system, copy, and website materials are protected by applicable intellectual property laws and may not be reproduced without authorization.</p>
      <h2>Limitation</h2>
      <p>The website is provided on an as-available basis. To the extent permitted by law, VECTR disclaims implied warranties and is not liable for indirect losses arising from use of this website.</p>
    </LegalPage>
  );
}
