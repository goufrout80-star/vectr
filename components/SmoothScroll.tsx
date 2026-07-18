"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const onAnchor = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href") || "");
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onAnchor);
    return () => document.removeEventListener("click", onAnchor);
  }, []);
  return null;
}
