// src/app/api/cohorts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

async function requireCoordinatorOrAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: { role: true },
  });

  if (!user || !["admin", "coordinator"].includes(user.role)) {
    throw new Error("Forbidden - admin or coordinator only");
  }

  return decoded.userId;
}

// GET /api/cohorts/:id - Get single cohort (publicly visible)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cohortId = Number(params.id);
    if (isNaN(cohortId)) {
      return NextResponse.json({ error: "Invalid cohort ID" }, { status: 400 });
    }

    const cohort = await prisma.cohort.findUnique({
      where: { cohort_id: cohortId },
      include: {
        members: {
          include: {
            user: {
              select: {
                fullName: true,
                email: true,
                studentId: true,
                department: true,
                yearOfStudy: true,
              },
            },
          },
        },
      },
    });

    if (!cohort) {
      return NextResponse.json({ error: "Cohort not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      cohort,
    });
  } catch (err) {
    console.error("GET cohort error:", err);
    return NextResponse.json({ error: "Failed to fetch cohort" }, { status: 500 });
  }
}

// PATCH /api/cohorts/:id - Update cohort (admin/coordinator only)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireCoordinatorOrAdmin(req);

    const cohortId = Number(params.id);
    if (isNaN(cohortId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await req.json();

    const updated = await prisma.cohort.update({
      where: { cohort_id: cohortId },
      data: body,
    });

    return NextResponse.json({
      success: true,
      message: "Cohort updated successfully",
      cohort: updated,
    });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : err.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: err.message || "Failed to update cohort" }, { status });
  }
}

// DELETE /api/cohorts/:id - Delete cohort (admin/coordinator only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireCoordinatorOrAdmin(req);

    const cohortId = Number(params.id);
    if (isNaN(cohortId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await prisma.cohort.delete({
      where: { cohort_id: cohortId },
    });

    return NextResponse.json({
      success: true,
      message: "Cohort deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete cohort" }, { status: 500 });
  }
}