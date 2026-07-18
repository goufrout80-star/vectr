import { SectionArrow } from "./SectionArrow";

export function InnerHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <section className="inner-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="inner-hero-bottom">
        <SectionArrow />
        <p>{description}</p>
      </div>
    </section>
  );
}
