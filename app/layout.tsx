import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VECTR — From call to crew",
    template: "%s — VECTR",
  },
  description:
    "AI-driven industrial staffing for critical infrastructure. Verified crews, mobilized with speed and precision.",
  alternates: { canonical: "/" },
  icons: { icon: "/vectr-mark.svg" },
  openGraph: {
    title: "VECTR — From call to crew",
    description: "Staffing the world's critical systems.",
    type: "website",
    images: [{ url: "/images/industrial-grid.webp", width: 1672, height: 939, alt: "VECTR critical infrastructure staffing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VECTR — From call to crew",
    description: "Staffing the world's critical systems.",
    images: ["/images/industrial-grid.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dcecf3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  );
}
