// src/app/api/cohorts/[id]/members/route.ts
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

// POST /api/cohorts/:id/members - Add member to cohort
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireCoordinatorOrAdmin(req);

    const cohortId = Number(params.id);
    if (isNaN(cohortId)) return NextResponse.json({ error: "Invalid cohort ID" }, { status: 400 });

    const body = await req.json();
    const { userId: targetUserId } = body;

    if (!targetUserId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Check if target user exists and is active member
    const targetUser = await prisma.user.findUnique({
      where: { user_id: targetUserId },
      include: { member: { select: { membershipStatus: true } } },
    });

    if (!targetUser || !targetUser.member || targetUser.member.membershipStatus !== "active") {
      return NextResponse.json(
        { error: "Cannot add - user must be an active member" },
        { status: 400 }
      );
    }

    // Check if already in cohort
    const existing = await prisma.cohortMember.findUnique({
      where: {
        cohortId_userId: {
          cohortId,
          userId: targetUserId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "User is already in this cohort" }, { status: 409 });
    }

    await prisma.cohortMember.create({
      data: {
        cohortId,
        userId: targetUserId,
      },
    });

    return NextResponse.json({ success: true, message: "Member added to cohort" }, { status: 201 });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : err.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: err.message || "Failed to add member to cohort" }, { status });
  }
}

// DELETE /api/cohorts/:id/members/:userId - Remove member from cohort
export async function DELETE(req: NextRequest, { params }: { params: { id: string; userId: string } }) {
  try {
    await requireCoordinatorOrAdmin(req);

    const cohortId = Number(params.id);
    const targetUserId = Number(params.userId);

    if (isNaN(cohortId) || isNaN(targetUserId)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const deleted = await prisma.cohortMember.delete({
      where: {
        cohortId_userId: {
          cohortId,
          userId: targetUserId,
        },
      },
    });

    if (!deleted) {
      return NextResponse.json({ error: "Member not found in this cohort" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Member removed from cohort" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to remove member from cohort" }, { status: 500 });
  }
}