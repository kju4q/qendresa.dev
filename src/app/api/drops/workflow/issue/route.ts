import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseServer } from "@/lib/server/supabase";
import { subscribeToMailchimp } from "@/lib/server/mailchimp";

export const dynamic = "force-dynamic";

const DROP_KEY = "workflow";

function normalizeEmail(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeName(value: unknown) {
  return String(value ?? "").trim();
}

function getSecret(request: NextRequest, body: any) {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "").trim();
  }
  return (
    request.headers.get("x-drop-secret")?.trim() ||
    String(body?.secret || "").trim()
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const secret = getSecret(request, body);
    const expectedSecret = String(process.env.WORKFLOW_DROP_ISSUE_SECRET || "").trim();

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const email = normalizeEmail(body?.email);
    const firstName = normalizeName(body?.firstName);
    const lastName = normalizeName(body?.lastName);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "Please provide a first and last name." },
        { status: 400 }
      );
    }

    await subscribeToMailchimp({ email, firstName, lastName });

    const supabaseServer = getSupabaseServer();
    let token = "";
    let inserted = false;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      token = `workflow-${crypto.randomBytes(8).toString("hex")}`;
      const { error } = await supabaseServer
        .from("drop_tokens")
        .insert({
          token,
          drop_key: DROP_KEY,
          issued_at: new Date().toISOString(),
          issued_email: email,
          issued_by_first_name: firstName,
          issued_by_last_name: lastName,
        });

      if (!error) {
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      return NextResponse.json({ error: "Failed to issue token." }, { status: 500 });
    }

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to issue token." },
      { status: 500 }
    );
  }
}
