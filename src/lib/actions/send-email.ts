"use server";

import { Resend } from "resend";
import { SendEmailProps, SendEmailResponse } from "@/types";

export async function sendEmail({
  to,
  subject,
  react,
}: SendEmailProps): Promise<SendEmailResponse> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      error: new Error("RESEND_API_KEY is not configured"),
    };
  }

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error : new Error("Unknown error occurred"),
    };
  }
}
