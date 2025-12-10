import pool from "@/lib/db";
import { NextRequest } from "next/server";

// Type for a user row
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

// GET user by ID
export async function GET(
  req: NextRequest,
  { params }: { params: {userId : string}} 

) {
  const { userId } = await params;

  try {
    const res = await pool.query<User>(
      "SELECT id, name, email, role, is_verified, created_at, updated_at FROM users WHERE id=$1",
      [userId]
    );

    const user = res.rows[0];
    if (!user) {
      return new Response("User Not Found", { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// PUT update user by ID
export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;

  try {
    const { name, email, role, is_verified } = await req.json();

    console.log("Updating user ID:", userId, { name, email, role, is_verified });

    const res = await pool.query<User>(
      `UPDATE users
       SET name=$1, email=$2, role=$3, is_verified=$4, updated_at=NOW()
       WHERE id=$5
       RETURNING id, name, email, role, is_verified, created_at, updated_at`,
      [name, email, role, is_verified, userId]
    );

    const user = res.rows[0];
    if (!user) {
      console.log("User not found for update, ID:", userId);
      return new Response("User Not Found", { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// DELETE user by ID
export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  console.log("Deleting user with ID:", userId);

  try {
    const res = await pool.query<{ userId: string }>(
      "DELETE FROM users WHERE id=$1 RETURNING id",
      [userId]
    );

    const user = res.rows[0];
    if (!user) {
      console.log("User not found for deletion, ID:", userId);
      return new Response("User Not Found", { status: 404 });
    }

    return new Response("User Deleted", { status: 200 });
  } catch (err) {
    console.error("Error deleting user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
