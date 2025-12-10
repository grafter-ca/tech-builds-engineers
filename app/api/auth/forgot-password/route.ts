import { NextRequest } from "next/server";
import pool from "@/lib/db";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Check user exists
    const resUser = await pool.query(
      "SELECT id, is_verified FROM users WHERE email=$1",
      [email]
    );

    if (resUser.rows.length === 0) {
      return new Response("No account found for this email", { status: 404 });
    }

    const user = resUser.rows[0];

    // Check verified
    if (!user.is_verified) {
      return new Response("Account is not verified", { status: 403 });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 10); // valid 10 minutes

    // Save token
    await pool.query(
      `UPDATE users 
       SET reset_token=$1, reset_token_expires=$2 
       WHERE id=$3`,
      [token, expires, user.id]
    );

    // Send email
    await resend.emails.send({
      from: "noreply@yourapp.com",
      to: email,
      subject: "Reset your password",
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">
          Reset Password
        </a>
      `,
    });

    return new Response("Reset email sent", { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
}
