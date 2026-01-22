// src/app/api/members/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// Single helper: verify token and check admin/coordinator role
async function requireAdminOrCoordinator(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    throw new Error("Unauthorized - no token provided");
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: { role: true },
  });

  if (!user || !["admin", "coordinator"].includes(user.role)) {
    throw new Error("Forbidden - only admins and coordinators can access other members");
  }

  return decoded.userId;
}

// GET /api/members/[id] - View details of any member (admin/coordinator only)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminOrCoordinator(req);

    const memberId = Number(params.id);
    if (isNaN(memberId)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    const member = await prisma.member.findUnique({
      where: { member_id: memberId },
      include: {
        user: {
          select: {
            user_id: true,
            fullName: true,
            email: true,
            studentId: true,
            department: true,
            yearOfStudy: true,
            role: true,
            accountStatus: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            bio: true,
          },
        },
      },
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      member: {
        memberId: member.member_id,
        userId: member.userId,
        joinDate: member.joinDate,
        membershipStatus: member.membershipStatus,
        skills: member.skills || [],
        interests: member.interests || [],
        points: member.points,
        user: member.user,
      },
    });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : err.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: err.message || "Failed to fetch member details" }, { status });
  }
}

// PATCH /api/members/[id] - Update membership status (admin/coordinator only)
// Note: This is focused on status change only. Self-updates go to /api/members/my
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminOrCoordinator(req);

    const memberId = Number(params.id);
    if (isNaN(memberId)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
    }

    const body = await req.json();
    const { membershipStatus } = body;

    const validStatuses = ["pending", "active", "suspended", "rejected", "expired"];
    if (!membershipStatus || !validStatuses.includes(membershipStatus)) {
      return NextResponse.json(
        { error: `Invalid membership status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updatedMember = await prisma.member.update({
      where: { member_id: memberId },
      data: { membershipStatus },
      include: {
        user: {
          select: { fullName: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Membership status updated to "${membershipStatus}"`,
      member: updatedMember,
    });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : err.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: err.message || "Failed to update member status" }, { status });
  }
}