// src/app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { serializeBigInt } from "@/lib/serialize";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// Helper: get authenticated user + check basic verification
async function getVerifiedUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  let decoded: { userId: number };
  try {
    decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    throw new Error("Invalid token");
  }

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: {
      user_id: true,
      fullName: true,
      email: true,
      role: true,
      isVerified: true,
      accountStatus: true,
    },
  });

  if (!user) throw new Error("User not found");
  if (!user.isVerified) throw new Error("Email not verified");
  if (user.accountStatus !== "active") throw new Error("Account inactive");

  return user;
}

export async function GET(req: NextRequest) {
  try {
    const user = await getVerifiedUser(req);

    // Fetch member profile
    const member = await prisma.member.findUnique({
      where: { userId: user.user_id },
      select: {
        member_id: true,
        joinDate: true,
        membershipStatus: true,
        skills: true,
        interests: true,
        points: true,
      },
    });

    // Fetch current cohort (latest one user is in)
    const cohortMember = await prisma.cohortMember.findFirst({
      where: { userId: user.user_id },
      include: {
        cohort: {
          select: {
            cohort_id: true,
            name: true,
            year: true,
            description: true,
            startDate: true,
            endDate: true,
          },
        },
      },
      orderBy: { cohort: { year: "desc" } },
    });

    // Fetch my projects (as creator or member)
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { createdById: user.user_id },
          { members: { some: { userId: user.user_id } } },
        ],
      },
      include: {
        createdBy: { select: { fullName: true } },
        members: {
          include: { user: { select: { fullName: true } } },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    });

    // ✅ SERIALIZE BigInt before returning JSON
    return NextResponse.json(
      serializeBigInt({
        success: true,
        user,
        member,
        cohort: cohortMember?.cohort || null,
        projects,
        stats: {
          totalPoints: member?.points || 0,
          projectCount: projects.length,
          isFullMember: member?.membershipStatus === "active",
        },
      })
    );
  } catch (err: any) {
    let status = 500;

    if (err.message === "Unauthorized" || err.message === "Invalid token") {
      status = 401;
    } else if (
      err.message === "Email not verified" ||
      err.message === "Account inactive"
    ) {
      status = 403;
    } else if (err.message === "User not found") {
      status = 404;
    }

    return NextResponse.json(
      { error: err.message || "Failed to load dashboard" },
      { status }
    );
  }
}
