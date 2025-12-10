import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) return new Response("Token missing", { status: 400 });

    // Verify JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // Update user as verified
    const res = await pool.query(
      "UPDATE users SET is_verified=TRUE, updated_at=NOW() WHERE id=$1 RETURNING id, email, is_verified",
      [payload.id]
    );

    if (!res.rows[0]) return new Response("User not found", { status: 404 });

    return new Response("Email verified successfully!", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Invalid or expired token", { status: 400 });
  }
}
