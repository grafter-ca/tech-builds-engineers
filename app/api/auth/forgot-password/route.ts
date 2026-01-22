import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { z } from "zod";

// SMTP transporter (Brevo or Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,      // e.g. "smtp-relay.brevo.com" or "smtp.gmail.com"
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = forgotSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Security: always return same message (don't reveal if email exists)
    if (!user) {
      return NextResponse.json(
        { message: "If the email exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: Number(user.user_id),
        token: hashedToken,
        expiresAt,
      },
    });

    // Reset link (use env var for production domain)
    const resetLink = `${
      process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"
    }/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // Send email with Nodemailer
    await transporter.sendMail({
      from: `"Engineering Tech Builders Club" <${process.env.SMTP_FROM || "club@engineeringtechbuilders.com"}>`,
      to: email,
      subject: "Reset Your Engineering Tech Builders Club Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Hello ${user.fullName || "Member"},</p>
        <p>We received a request to reset your password. Click the link below to set a new one:</p>
        <p style="margin: 20px 0;">
          <a href="${resetLink}" style="padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email — your account is safe.</p>
        <br>
        <p>Engineering Tech Builders Club Team</p>
      `,
    });

    return NextResponse.json(
      { message: "If the email exists, a reset link has been sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}