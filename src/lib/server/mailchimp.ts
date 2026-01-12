import "server-only";

import crypto from "crypto";

type MailchimpError = {
  title?: string;
  detail?: string;
};

export type MailchimpSubscribeResult = {
  status: "subscribed" | "exists";
};

type SubscribeInput = {
  email: string;
  firstName?: string;
  lastName?: string;
};

export async function subscribeToMailchimp(
  input: SubscribeInput
): Promise<MailchimpSubscribeResult> {
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!mailchimpApiKey || !mailchimpAudienceId || !mailchimpServerPrefix) {
    throw new Error("Missing Mailchimp environment variables.");
  }

  const email = input.email.trim().toLowerCase();
  const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
  const url = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members/${subscriberHash}`;

  const mergeFields: Record<string, string> = {};
  if (input.firstName) {
    mergeFields.FNAME = input.firstName;
  }
  if (input.lastName) {
    mergeFields.LNAME = input.lastName;
  }

  const body = {
    email_address: email,
    status_if_new: "subscribed",
    status: "subscribed",
    ...(Object.keys(mergeFields).length > 0 ? { merge_fields: mergeFields } : {}),
  };

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${mailchimpApiKey}`).toString("base64")}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as MailchimpError;
    const title = data.title?.toLowerCase() || "";
    if (title.includes("member exists")) {
      return { status: "exists" };
    }
    throw new Error(data.detail || "Failed to subscribe. Please try again.");
  }

  return { status: "subscribed" };
}
