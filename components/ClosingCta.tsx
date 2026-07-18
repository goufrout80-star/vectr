import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function ClosingCta({ title = "Put the right crew on the critical path." }: { title?: string }) {
  return (
    <section className="inner-closing">
      <Reveal>
        <span>Ready when you are</span>
        <h2>{title}</h2>
        <div>
          <Link href="/apply" className="pill-link pill-link--outline">Apply <ArrowRight size={15}/></Link>
          <Link href="/request-crew" className="pill-link pill-link--light">Request crews <ArrowRight size={15}/></Link>
        </div>
      </Reveal>
    </section>
  );
}
