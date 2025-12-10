// app/api/students/[id]/route.ts
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const res = await pool.query("SELECT * FROM students WHERE id=$1", [id]);

    if (!res.rows.length)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    const allowed = [
      "reg_number",
      "field_study",
      "level_study",
      "phone",
      "avatar",
      "is_payed",
      "payed_at",
      "update_payment_at",
    ];

    for (const key of allowed) {
      if (body[key] !== undefined) {
        fields.push(`${key}=$${idx}`);
        values.push(body[key]);
        idx++;
      }
    }

    if (!fields.length)
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    values.push(id);

    const q = `
      UPDATE students 
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id=$${idx}
      RETURNING *
    `;

    const res = await pool.query(q, values);

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await pool.query("DELETE FROM students WHERE id=$1", [params.id]);
    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
