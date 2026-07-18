import { Footer } from "./Footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="inner-page legal-page">
      <section className="legal-hero">
        <p className="eyebrow">Legal / VECTR</p>
        <h1>{title}</h1>
        <span>Last updated {updated}</span>
      </section>
      <article className="legal-copy">{children}</article>
      <Footer />
    </main>
  );
}
