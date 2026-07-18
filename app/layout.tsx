import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import { CursorGlow } from "@/components/CursorGlow";
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
    default: "VECTR — The New Standard in Staffing",
    template: "%s — VECTR",
  },
  description:
    "AI-driven industrial staffing for critical infrastructure. Verified crews, mobilized with speed and precision.",
  alternates: { canonical: "/" },
  icons: { icon: "/vectr-mark.svg" },
  openGraph: {
    title: "VECTR — The New Standard in Staffing",
    description: "Staffing the world's critical systems.",
    type: "website",
    images: [{ url: "/images/editorial/standards.webp", width: 1600, height: 1066, alt: "VECTR critical infrastructure staffing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VECTR — From call to crew",
    description: "Staffing the world's critical systems.",
    images: ["/images/editorial/standards.webp"],
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
        <CursorGlow />
        <Header />
        {children}
      </body>
    </html>
  );
}
