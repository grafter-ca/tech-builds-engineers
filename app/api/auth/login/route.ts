// app/api/auth/login/route.ts
import pool from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing" }, { status: 400 });

    const res = await pool.query("SELECT id, name, email, password, role FROM users WHERE email=$1", [email]);
    const user = res.rows[0];
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = generateToken({ userId: user.id, role: user.role });

    //set cookie (uncomment to use)
    const response = NextResponse.json({ user });
    response.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60*60*24*7 });
    //return token in response (client stores it)
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
