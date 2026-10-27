import { NextResponse } from "next/server";

// TODO: forward to email (Resend / SendGrid / SMTP) or your CRM / ATS.
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data?.name || !data?.email || !data?.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  console.log("[contact]", { mode: data.mode, name: data.name, email: data.email, company: data.company });
  return NextResponse.json({ ok: true });
}
