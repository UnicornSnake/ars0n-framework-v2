import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Estimate-request handler.
 * 1. Drops obvious spam (honeypot).
 * 2. Verifies the Cloudflare Turnstile token server-side.
 * 3. Emails the lead via the Resend REST API.
 *
 * Secrets (TURNSTILE_SECRET_KEY, RESEND_API_KEY, ESTIMATE_TO_EMAIL,
 * ESTIMATE_FROM_EMAIL) are provided as Worker secrets / env vars. OpenNext
 * populates process.env from the Cloudflare environment at runtime.
 */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  service?: string;
  message?: string;
  source?: string;
  company?: string; // honeypot
  turnstileToken?: string;
};

function clean(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured (e.g. local dev), skip verification.
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendEmail(payload: Payload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ESTIMATE_TO_EMAIL || site.email;
  const from = process.env.ESTIMATE_FROM_EMAIL || "CDS Hardwood Floors <onboarding@resend.dev>";

  // In dev without a key, log instead of failing so the form is testable.
  if (!apiKey) {
    console.info("[estimate] RESEND_API_KEY not set — lead not emailed:", payload);
    return;
  }

  const lines = [
    `New estimate request from ${site.name} website`,
    `Source page: ${payload.source || "unknown"}`,
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Location: ${payload.location || "—"}`,
    `Service: ${payload.service || "—"}`,
    "",
    "Details:",
    payload.message || "—",
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `New estimate request — ${payload.name || "Website lead"}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this.
  if (clean(data.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email, and phone are required." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for");

  const human = await verifyTurnstile(clean(data.turnstileToken, 4000), ip);
  if (!human) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 400 }
    );
  }

  try {
    await sendEmail({
      name,
      email,
      phone,
      location: clean(data.location, 120),
      service: clean(data.service, 120),
      message: clean(data.message, 4000),
      source: clean(data.source, 40),
    });
  } catch (err) {
    console.error("[estimate] send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your request. Please call us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
