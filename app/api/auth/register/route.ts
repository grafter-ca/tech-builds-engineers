// app/api/auth/register/route.ts
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);
    if (existing.rows.length) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const res = await pool.query(
      `INSERT INTO users (name, email, password, role, is_verified, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,NOW(),NOW()) RETURNING id, name, email, role, is_verified`,
      [name, email, hashed, "student", false]
    );

    const user = res.rows[0];

    // Create verification token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Send verification email
    await resend.emails.send({
      from: "noreply@example.com",
      to: email,
      subject: "Verify your email",
      html: `
      div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1>Email Verification</h1>
        <p>Thank you for registering, ${name || "User"}!</p>

      <p>Click <a href="${
        process.env.FRONTEND_URL
      }/api/auth/verify?token=${token}">here</a> to verify your email.</p>
        <p>This link will expire in 24 hours.</p>
        <br />
        <p>Best regards,<br/>Tech Build Engineers Team </p>
      </div>
      `,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
