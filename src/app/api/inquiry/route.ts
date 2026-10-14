import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      name?: unknown;
      email?: unknown;
      organization?: unknown;
      project?: unknown;
      message?: unknown;
    } | null;

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const organization =
      typeof body?.organization === "string" ? body.organization.trim().slice(0, 200) : null;
    const project =
      typeof body?.project === "string" ? body.project.trim().slice(0, 300) : null;
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || name.length > 200) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name." },
        { status: 400 }
      );
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Please add a little more to your message (10–5000 characters)." },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({
      data: { name, email, organization, project, message, status: "new" },
    });

    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (err) {
    console.error("[inquiry] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
