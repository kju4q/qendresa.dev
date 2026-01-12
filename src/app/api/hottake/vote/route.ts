import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server/supabase";
import { getUserHash, getWeekStartUtc } from "@/lib/server/hot-take";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.hotTakeId || !body?.anonId) {
    return NextResponse.json({ error: "Missing hotTakeId or anonId." }, { status: 400 });
  }

  const userHash = getUserHash(String(body.anonId));
  const hotTakeId = String(body.hotTakeId);
  const weekStart = getWeekStartUtc();

  const { data: take, error: takeError } = await supabaseServer
    .from("hot_takes")
    .select("id,user_hash,vote_count")
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

  const nextCount = (take.vote_count || 0) + 1;
  const { error: updateError } = await supabaseServer
    .from("hot_takes")
    .update({ vote_count: nextCount })
    .eq("id", hotTakeId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ vote_count: nextCount });
}
