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
      .select("token, used_at, issued_email, issued_by_first_name, issued_by_last_name")
      .eq("token", token)
      .eq("drop_key", DROP_KEY)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Invalid token." }, { status: 404 });
    }

    if (data.used_at) {
      return NextResponse.json({ error: "Token already used." }, { status: 410 });
    }

    const autoUnlock = Boolean(
      data.issued_email && data.issued_by_first_name && data.issued_by_last_name
    );
    return NextResponse.json({ ok: true, autoUnlock });
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

    const supabaseServer = getSupabaseServer();
    const { data: record, error: recordError } = await supabaseServer
      .from("drop_tokens")
      .select("token, used_at, issued_email, issued_by_first_name, issued_by_last_name")
      .eq("token", token)
      .eq("drop_key", DROP_KEY)
      .single();

    if (recordError || !record) {
      return NextResponse.json({ error: "Invalid token." }, { status: 404 });
    }

    if (record.used_at) {
      return NextResponse.json({ error: "Token already used." }, { status: 410 });
    }

    const issuedEmail = normalizeEmail(record.issued_email);
    const issuedFirstName = normalizeName(record.issued_by_first_name);
    const issuedLastName = normalizeName(record.issued_by_last_name);

    if (issuedEmail && email && issuedEmail !== email) {
      return NextResponse.json(
        { error: "This link is assigned to another email." },
        { status: 403 }
      );
    }

    const finalEmail = email || issuedEmail;
    const finalFirstName = firstName || issuedFirstName;
    const finalLastName = lastName || issuedLastName;

    if (!finalEmail || !finalEmail.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    if (!finalFirstName || !finalLastName) {
      return NextResponse.json(
        { error: "Please provide your first and last name." },
        { status: 400 }
      );
    }

    await subscribeToMailchimp({
      email: finalEmail,
      firstName: finalFirstName,
      lastName: finalLastName,
    });

    const { data: updated, error: updateError } = await supabaseServer
      .from("drop_tokens")
      .update({
        used_at: new Date().toISOString(),
        used_by_email: finalEmail,
        used_by_first_name: finalFirstName,
        used_by_last_name: finalLastName,
        issued_email: record.issued_email || finalEmail,
        issued_by_first_name: record.issued_by_first_name || finalFirstName,
        issued_by_last_name: record.issued_by_last_name || finalLastName,
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
