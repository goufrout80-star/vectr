"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

const nav = [
  { href: "/industries", label: "Our industries" },
  { href: "/our-mission", label: "Our mission" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${open ? "site-header--menu" : ""}`}>
        <nav className="header-nav" aria-label="Primary navigation">
          <div className="header-left">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
                {item.label}
              </Link>
            ))}
          </div>

          <Wordmark />

          <div className="header-actions">
            <Link className="button button--quiet" href="/apply">
              Apply
            </Link>
            <Link className="button button--dark" href="/request-crew">
              Request crews
            </Link>
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          {[...nav, { href: "/apply", label: "Apply" }, { href: "/request-crew", label: "Request crews" }].map(
            (item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                <span>0{index + 1}</span>
                {item.label}
              </Link>
            ),
          )}
          <p>Intelligent workflows. Expert curation. Crews ready for the critical path.</p>
        </div>
      </div>
    </>
  );
}
