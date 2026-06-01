import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactTo = "jonaselcid30@gmail.com";
const fromAddress =
  process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim().slice(0, 120);
    const cleanEmail = String(email).trim().slice(0, 180);
    const cleanMessage = String(message).trim().slice(0, 5000);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName || !cleanEmail || !cleanMessage || !emailPattern.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and message." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeMessage = escapeHtml(cleanMessage);

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: contactTo,
      replyTo: cleanEmail,
      subject: `New message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 32px; background: #0a0a0a; color: #e5e5e5; border-radius: 8px; border: 1px solid #222;">
          <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #666; margin: 0 0 24px;">Portfolio - New Message</p>
          <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 24px; color: #fff;">${safeName} reached out</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 12px; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: #e5e5e5; font-size: 13px;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 12px;">Email</td>
              <td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${safeEmail}" style="color: #7C3AED;">${safeEmail}</a></td>
            </tr>
          </table>
          <div style="background: #111; border: 1px solid #222; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; color: #666; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="font-size: 14px; line-height: 1.7; color: #ccc; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="font-size: 11px; color: #444; margin: 0;">Sent from Jonas David's portfolio. Reply directly to this email to respond.</p>
        </div>
      `,
    });

    if (error) {
      console.error("[/api/contact] Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send message. Email jonaselcid30@gmail.com if this keeps happening." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Email jonaselcid30@gmail.com if this keeps happening." },
      { status: 500 }
    );
  }
}
