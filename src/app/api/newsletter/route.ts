import { NextResponse } from "next/server";
import crypto from "crypto";

type MailchimpError = {
  title?: string;
  detail?: string;
};

export async function POST(request: Request) {
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!mailchimpApiKey || !mailchimpAudienceId || !mailchimpServerPrefix) {
    return NextResponse.json(
      { error: "Missing Mailchimp environment variables." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
  const url = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members/${subscriberHash}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${mailchimpApiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      status: "subscribed",
    }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as MailchimpError;
    const title = data.title?.toLowerCase() || "";
    if (title.includes("member exists")) {
      return NextResponse.json({ error: "You're already subscribed." }, { status: 409 });
    }
    return NextResponse.json(
      { error: data.detail || "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
