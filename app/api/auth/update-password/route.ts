import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// Type for user
type User = {
  id: string;
  password: string;
  created_at: string;
  is_verified: boolean;
};

export async function POST(
  req: NextRequest
) {
  try {
    const { userId, oldPassword, newPassword } = await req.json();

    // Fetch user
    const res = await pool.query<User>(
      "SELECT id, password, created_at, is_verified FROM users WHERE id=$1",
      [userId]
    );
    const user = res.rows[0];
    if (!user) return new Response("User not found", { status: 404 });

    // Check if account is verified
    if (!user.is_verified) return new Response("Account not verified", { status: 403 });

    // Calculate account age in months
    const createdAt = new Date(user.created_at);
    const now = new Date();
    const diffMonths = (now.getFullYear() - createdAt.getFullYear()) * 12 + (now.getMonth() - createdAt.getMonth());

    if (diffMonths < 1) {
      // User can update password directly
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return new Response("Old password is incorrect", { status: 401 });

      const hashed = await bcrypt.hash(newPassword, 10);
      await pool.query("UPDATE users SET password=$1, updated_at=NOW() WHERE id=$2", [hashed, userId]);

      return new Response("Password updated successfully", { status: 200 });
    } else {
      // Older account: mark password reset requested
      await pool.query("UPDATE users SET password_reset_requested=TRUE, updated_at=NOW() WHERE id=$1", [userId]);
      return new Response("Password update requires admin approval", { status: 403 });
    }
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
