import { NextResponse } from "next/server";
import { subscribeToMailchimp } from "@/lib/server/mailchimp";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  try {
    const result = await subscribeToMailchimp({ email });
    if (result.status === "exists") {
      return NextResponse.json({ error: "You're already subscribed." }, { status: 409 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to subscribe." },
      { status: 500 }
    );
  }
}
