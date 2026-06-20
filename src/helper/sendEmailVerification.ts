import { jsx } from "react/jsx-runtime";

import VerificationEmail from "../../emails/VerificationEmail";

import { resend, resendFrom, resendReplyTo } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponses";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { error } = await resend.emails.send({
      from: resendFrom,
      to: email,
      replyTo: resendReplyTo,
      subject: "Mystery Message | Verification Code",
      react: jsx(VerificationEmail, { username, otp: verifyCode }),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    const message =
      emailError instanceof Error ? emailError.message : String(emailError);

    console.error("Error sending verification email", emailError);
    return { success: false, message };
  }
}
