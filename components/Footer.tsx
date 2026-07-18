import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Wordmark inverse />
        <p>Precision workforce logistics for the world&apos;s most critical systems.</p>
        <Link href="/request-crews" className="footer-action">
          Request crews <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="footer-bottom">
        <nav aria-label="Footer navigation">
          <Link href="/industries">Our industries</Link>
          <Link href="/mission">Our mission</Link>
          <Link href="/apply">Apply</Link>
        </nav>
        <span>© {new Date().getFullYear()} VECTR, Inc.</span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
