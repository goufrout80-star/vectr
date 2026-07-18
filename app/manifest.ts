import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VECTR — The New Standard in Staffing",
    short_name: "VECTR",
    description: "AI-driven precision staffing for critical infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#dcecf3",
    theme_color: "#dcecf3",
    icons: [{ src: "/vectr-mark.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
