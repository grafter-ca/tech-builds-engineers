import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { serializeBigInt } from "@/lib/serialize";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// -----------------------------
// Helper: Get current user ID
// -----------------------------
async function getCurrentUserId(req: NextRequest): Promise<number> {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded.userId;
  } catch {
    throw new Error("Unauthorized");
  }
}

// --------------------------------------
// Helper: Check active membership payment
// --------------------------------------
async function hasActiveMembership(userId: number): Promise<boolean> {
  const payment = await prisma.payment.findFirst({
    where: {
      userId,
      purposeType: "membership",
      paymentStatus: "success",
    },
    orderBy: { transactionDate: "desc" },
  });

  return Boolean(payment);
}

// ======================================
// GET /api/members/my
// ======================================
export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUserId(req);

    const member = await prisma.member.findUnique({
      where: { userId },
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
            isActive: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            bio: true,
          },
        },
      },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Member profile not found" },
        { status: 404 }
      );
    }

    const response = {
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
        hasActiveSubscription: await hasActiveMembership(userId),
      },
    };

    return NextResponse.json(serializeBigInt(response));
  } catch (err: any) {
    console.error("GET /api/members/my error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch profile" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// ======================================
// PATCH /api/members/my
// ======================================
export async function PATCH(req: NextRequest) {
  try {
    const userId = await getCurrentUserId(req);

    const hasPaid = await hasActiveMembership(userId);
    if (!hasPaid) {
      return NextResponse.json(
        {
          error:
            "Active membership subscription required to update profile.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const memberUpdate: any = {};
    const userUpdate: any = {};

    if (body.skills !== undefined) {
      memberUpdate.skills = Array.isArray(body.skills)
        ? body.skills
        : body.skills.split(",").map((s: string) => s.trim());
    }

    if (body.interests !== undefined) {
      memberUpdate.interests = Array.isArray(body.interests)
        ? body.interests
        : body.interests.split(",").map((i: string) => i.trim());
    }

    if (body.bio !== undefined) userUpdate.bio = body.bio || null;
    if (body.studentId !== undefined)
      userUpdate.studentId = body.studentId || null;
    if (body.department !== undefined)
      userUpdate.department = body.department || null;
    if (body.yearOfStudy !== undefined)
      userUpdate.yearOfStudy = body.yearOfStudy || null;

    const updated = await prisma.$transaction(async (tx) => {
      if (Object.keys(memberUpdate).length) {
        await tx.member.update({
          where: { userId },
          data: memberUpdate,
        });
      }

      if (Object.keys(userUpdate).length) {
        await tx.user.update({
          where: { user_id: userId },
          data: userUpdate,
        });
      }

      return tx.member.findUnique({
        where: { userId },
        include: { user: true },
      });
    });

    return NextResponse.json(
      serializeBigInt({
        success: true,
        message: "Profile updated successfully",
        member: updated,
      })
    );
  } catch (err: any) {
    console.error("PATCH /api/members/my error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update profile" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
