import nodemailer from "nodemailer";
import http from 'http'

export const sendEmail = async ({ sendTo, subject,text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
      to: sendTo,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email send error:", error);
     throw error;
    // throw new Error("Email not sent");
  }
};


