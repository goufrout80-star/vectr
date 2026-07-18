import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim();
    const name = String(body.name || `${body.firstName || ""} ${body.lastName || ""}`).trim();
    if (!name || !email || !email.includes("@")) return NextResponse.json({ ok: false, error: "Invalid contact details" }, { status: 400 });

    const payload = Object.fromEntries(Object.entries(body).map(([key, value]) => [key, typeof value === "string" ? value.slice(0, 5000) : value]));
    const webhook = process.env.VECTR_FORM_WEBHOOK;
    if (webhook) {
      const delivery = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }) });
      if (!delivery.ok) return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, mode: webhook ? "delivered" : "preview" }, { status: 202 });
  } catch { return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 }); }
}
