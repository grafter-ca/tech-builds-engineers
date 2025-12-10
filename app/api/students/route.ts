// app/api/students/route.ts
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await pool.query("SELECT * FROM students ORDER BY created_at DESC");
    return NextResponse.json(res.rows);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, field_study,learning_path,level, phone, avatar } = await req.json();
    if (!user_id) return NextResponse.json({ error: "user_id required" }, { status: 400 });

    const exists = await pool.query("SELECT id FROM students WHERE user_id=$1", [user_id]);
    if (exists.rows.length) {
      return NextResponse.json({ error: "Profile already exists" }, { status: 400 });
    }

    const res = await pool.query(
      `INSERT INTO students (user_id,field_study,learning_path,level, phone, avatar, is_payed, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,false,NOW()) RETURNING *`,
      [user_id, field_study,learning_path, level || "Student", phone, avatar]
    );

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
