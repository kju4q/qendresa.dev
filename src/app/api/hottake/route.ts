import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/server/supabase";
import { getUserHash, getWeekStartUtc, sanitizeHotTake } from "@/lib/server/hot-take";
import { getClientIp, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabaseServer = getSupabaseServer();
  const { searchParams } = new URL(request.url);
  const anonId = searchParams.get("anonId") || "";
  const userHash = anonId ? getUserHash(anonId) : null;
  const weekStart = getWeekStartUtc();

  const { data: takes, error } = await supabaseServer
    .from("hot_takes")
    .select("id,text,created_at,vote_count,user_hash")
    .order("vote_count", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let votedSet = new Set<string>();
  if (userHash) {
    const { data: votes } = await supabaseServer
      .from("hot_take_votes")
      .select("hot_take_id")
      .eq("user_hash", userHash)
      .eq("week_start", weekStart);

    votedSet = new Set((votes || []).map((vote) => vote.hot_take_id));
  }

  const response = (takes || []).map((take) => {
    const isOwn = userHash ? take.user_hash === userHash : false;
    const hasVoted = userHash ? votedSet.has(take.id) : false;
    return {
      id: take.id,
      text: take.text,
      created_at: take.created_at,
      vote_count: take.vote_count,
      isOwn,
      canVote: !isOwn && !hasVoted,
    };
  });

  return NextResponse.json({ takes: response });
}

export async function POST(request: NextRequest) {
  const supabaseServer = getSupabaseServer();
  const body = await request.json().catch(() => null);
  if (!body?.text || !body?.anonId) {
    return NextResponse.json({ error: "Missing text or anonId." }, { status: 400 });
  }

  const anonId = String(body.anonId);
  const ip = getClientIp(request);
  const limit = rateLimit(`hottake:create:${ip}:${anonId}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many hot takes. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const cleaned = sanitizeHotTake(String(body.text));
  if (!cleaned || cleaned.length < 3) {
    return NextResponse.json({ error: "Hot take is too short." }, { status: 400 });
  }
  if (cleaned.length > 240) {
    return NextResponse.json({ error: "Hot take is too long (max 240)." }, { status: 400 });
  }

  const userHash = getUserHash(anonId);

  const { data, error } = await supabaseServer
    .from("hot_takes")
    .insert({ text: cleaned, user_hash: userHash })
    .select("id,text,created_at,vote_count")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ take: data });
}
