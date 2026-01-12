import { NextRequest, NextResponse } from "next/server";
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

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")?.trim() || "";
    if (!token) {
      return NextResponse.json({ error: "Missing token." }, { status: 400 });
    }

    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
      .from("drop_tokens")
      .select("token, used_at")
      .eq("token", token)
      .eq("drop_key", DROP_KEY)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Invalid token." }, { status: 404 });
    }

    if (data.used_at) {
      return NextResponse.json({ error: "Token already used." }, { status: 410 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to validate link." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const token = String(body?.token || "").trim();
    const email = normalizeEmail(body?.email);
    const firstName = normalizeName(body?.firstName);
    const lastName = normalizeName(body?.lastName);

    if (!token) {
      return NextResponse.json({ error: "Missing token." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "Please provide your first and last name." },
        { status: 400 }
      );
    }

    const supabaseServer = getSupabaseServer();
    const { data: record, error: recordError } = await supabaseServer
      .from("drop_tokens")
      .select("token, used_at")
      .eq("token", token)
      .eq("drop_key", DROP_KEY)
      .single();

    if (recordError || !record) {
      return NextResponse.json({ error: "Invalid token." }, { status: 404 });
    }

    if (record.used_at) {
      return NextResponse.json({ error: "Token already used." }, { status: 410 });
    }

    await subscribeToMailchimp({ email, firstName, lastName });

    const { data: updated, error: updateError } = await supabaseServer
      .from("drop_tokens")
      .update({
        used_at: new Date().toISOString(),
        used_by_email: email,
        used_by_first_name: firstName,
        used_by_last_name: lastName,
      })
      .eq("token", token)
      .eq("drop_key", DROP_KEY)
      .is("used_at", null)
      .select("token");

    if (updateError || !updated?.length) {
      return NextResponse.json({ error: "Token already used." }, { status: 410 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to unlock." },
      { status: 500 }
    );
  }
}
