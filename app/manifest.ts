import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VECTR — From call to crew",
    short_name: "VECTR",
    description: "AI-driven precision staffing for critical infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#dcecf3",
    theme_color: "#dcecf3",
    icons: [{ src: "/vectr-mark.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
