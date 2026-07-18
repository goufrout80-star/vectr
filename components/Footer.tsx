import Link from "next/link";
import { ArrowRight } from "lucide-react";

const links = [
  { number: "01", label: "Our industries", href: "/industries" },
  { number: "02", label: "Our mission", href: "/our-mission" },
  { number: "03", label: "Apply", href: "/apply" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        {links.map((item) => (
          <Link href={item.href} key={item.href}>
            <span>{item.number}</span>
            <strong>{item.label}</strong>
            <i aria-hidden="true"><ArrowRight size={18} /></i>
          </Link>
        ))}
      </div>
      <Link href="/" className="footer-wordmark" aria-label="VECTR home">VECTR</Link>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VECTR, Inc.</span>
        <span>Built for the critical path</span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">ToS</Link>
        </nav>
      </div>
    </footer>
  );
}
