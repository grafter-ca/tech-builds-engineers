import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();

  // Check token validity
  const res = await pool.query(
    "SELECT id FROM users WHERE reset_token=$1 AND reset_token_expires > NOW()",
    [token]
  );

  if (res.rows.length === 0) {
    return new Response("Invalid or expired token", { status: 400 });
  }

  const userId = res.rows[0].id;

  const hashed = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `UPDATE users 
     SET password=$1, reset_token=NULL, reset_token_expires=NULL, updated_at=NOW() 
     WHERE id=$2`,
    [hashed, userId]
  );

  return new Response("Password reset successful", { status: 200 });
}
