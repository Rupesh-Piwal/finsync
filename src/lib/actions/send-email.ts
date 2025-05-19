"use server";

import { Resend } from "resend";
import { ReactElement } from "react";

interface SendEmailProps {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

interface SendEmailResponse {
  success: boolean;
  data?: any;
  error?: Error | unknown;
}

export async function sendEmail({
  to,
  subject,
  react,
}: SendEmailProps): Promise<SendEmailResponse> {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

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
    return { success: false, error };
  }
}
