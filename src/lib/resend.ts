import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY?.trim();

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(resendApiKey);
export const resendFrom =
  process.env.RESEND_FROM_EMAIL?.trim() ?? "onboarding@resend.dev";
export const resendReplyTo =
  process.env.RESEND_REPLY_TO_EMAIL?.trim() ?? resendFrom;
