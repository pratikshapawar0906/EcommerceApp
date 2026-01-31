import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ sendTo, subject,text, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Ecommerce App <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html || `<p>${text}</p>`,
    });

    return data;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};


