"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const industries = [
  {
    id: "nuclear",
    number: "01",
    name: "Nuclear Power",
    image: "/images/editorial/nuclear.webp",
    alt: "Technical crew in a nuclear turbine hall",
    title: "Precision staffing for nuclear facilities and outages",
    text: "Every worker is evaluated against the same zero-fail standard used to protect a nuclear critical path—credentials clear, arrival controlled, field fit proven.",
    roles: ["Project schedulers", "Welders", "Radiation protection", "Scaffolders", "Administrative", "Boilermakers", "Electricians", "Decontamination", "P6 planners"],
    stat: "100%",
    statLabel: "credential verification before dispatch",
  },
  {
    id: "gas",
    number: "02",
    name: "Gas",
    image: "/images/editorial/gas.webp",
    alt: "Technicians inspecting an industrial gas turbine",
    title: "Staffing for high-output, time-critical turbine operations",
    text: "Compressed turnaround windows leave no room for weak links. We mobilize proven mechanical and technical crews around the actual service scope and schedule.",
    roles: ["Turbine millwrights", "Combustion technicians", "Welders", "Borescope technicians", "Riggers", "Electricians", "Field engineers", "Safety specialists", "Planners"],
    stat: "24/7",
    statLabel: "active outage coordination",
  },
  {
    id: "data-centers",
    number: "03",
    name: "Data Centers",
    image: "/images/editorial/data-center.webp",
    alt: "Commissioning specialists in a hyperscale data center",
    title: "Precision staffing for data center build-outs and uptime",
    text: "From construction through commissioning, we supply qualified specialists who understand mission-critical sequencing, QA requirements and the economics of uptime.",
    roles: ["Commissioning agents", "Electricians", "Controls technicians", "QA / QC", "Pipefitters", "Mechanical specialists", "Network technicians", "Schedulers", "Supervisors"],
    stat: "70%",
    statLabel: "faster workforce mobilization",
  },
  {
    id: "semiconductors",
    number: "04",
    name: "Semiconductors",
    image: "/images/editorial/semiconductor.webp",
    alt: "Professionals working inside a semiconductor fabrication cleanroom",
    title: "Precision staffing for semiconductor fabs and facilities",
    text: "Protocol discipline, cleanroom readiness and technical accuracy are screened before dispatch so highly controlled environments stay productive.",
    roles: ["Cleanroom technicians", "Tool install", "Pipefitters", "Orbital welders", "Electricians", "Instrumentation", "QA / QC", "Safety", "Commissioning"],
    stat: "0",
    statLabel: "unchecked workers at the gate",
  },
];

export function IndustryChapters() {
  const [active, setActive] = useState(industries[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -55%", threshold: [0.15, 0.4, 0.7] });
    industries.forEach((item) => { const node = document.getElementById(item.id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="industry-chapters">
      <aside>
        <span>Our industries</span>
        <nav aria-label="Industry sections">
          {industries.map((item) => <a key={item.id} href={`#${item.id}`} className={active === item.id ? "active" : ""}><i>{item.number}</i>{item.name}</a>)}
        </nav>
      </aside>
      <div className="industry-chapter-list">
        {industries.map((item) => (
          <article id={item.id} key={item.id}>
            <div className="industry-chapter-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 70vw"/><span>{item.number} / 04</span></div>
            <div className="industry-chapter-copy">
              <div><span>{item.name}</span><h2>{item.title}</h2></div>
              <p>{item.text}</p>
            </div>
            <div className="industry-role-grid">
              <div className="industry-stat"><strong>{item.stat}</strong><span>{item.statLabel}</span></div>
              <div><span className="role-label">Field roles</span><ul>{item.roles.map((role, i) => <li key={role}><span>{String(i + 1).padStart(2, "0")}</span>{role}</li>)}</ul></div>
            </div>
            <Link href="/request-crew" className="chapter-link">Request {item.name.toLowerCase()} crews <ArrowRight size={16}/></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
