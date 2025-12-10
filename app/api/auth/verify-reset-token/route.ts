import { NextRequest } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const res = await pool.query(
    "SELECT id FROM users WHERE reset_token=$1 AND reset_token_expires > NOW()",
    [token]
  );

  if (res.rows.length === 0) {
    return new Response("Invalid or expired token", { status: 400 });
  }

  return Response.json({ userId: res.rows[0].id });
}
