import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/server/supabase";
import { getUserHash, getWeekStartUtc } from "@/lib/server/hot-take";
import { getClientIp, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabaseServer = getSupabaseServer();
  const body = await request.json().catch(() => null);
  if (!body?.hotTakeId || !body?.anonId) {
    return NextResponse.json({ error: "Missing hotTakeId or anonId." }, { status: 400 });
  }

  const anonId = String(body.anonId);
  const ip = getClientIp(request);
  const limit = rateLimit(`hottake:vote:${ip}:${anonId}`, 20, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many votes. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const userHash = getUserHash(anonId);
  const hotTakeId = String(body.hotTakeId);
  const weekStart = getWeekStartUtc();

  const { data: take, error: takeError } = await supabaseServer
    .from("hot_takes")
    .select("id,user_hash")
    .eq("id", hotTakeId)
    .single();

  if (takeError || !take) {
    return NextResponse.json({ error: "Hot take not found." }, { status: 404 });
  }

  if (take.user_hash === userHash) {
    return NextResponse.json({ error: "You cannot vote your own hot take." }, { status: 403 });
  }

  const { error: voteError } = await supabaseServer
    .from("hot_take_votes")
    .insert({
      hot_take_id: hotTakeId,
      user_hash: userHash,
      week_start: weekStart,
    });

  if (voteError) {
    const message = voteError.message.toLowerCase();
    if (message.includes("duplicate") || message.includes("unique")) {
      return NextResponse.json({ error: "Already voted this week." }, { status: 409 });
    }
    return NextResponse.json({ error: voteError.message }, { status: 500 });
  }

  const { data: updated, error: updateError } = await supabaseServer
    .from("hot_takes")
    .select("vote_count")
    .eq("id", hotTakeId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const voteCount = updated?.[0]?.vote_count ?? 0;
  return NextResponse.json({ vote_count: voteCount });
}
