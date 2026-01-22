import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

export async function GET(req: NextRequest) {
  // Extract token from Authorization header
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "No token provided - add Bearer token in Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
      role: string;
    };

    // Fetch full user info from DB
    const user = await prisma.user.findUnique({
      where: { user_id: decoded.userId },
      include: {
        member: true, // include membership details
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return safe user data (no passwordHash!)
    return NextResponse.json({
      userId: Number(user.user_id),
      email: user.email,
      fullName: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      studentId: user.studentId,
      department: user.department,
      yearOfStudy: user.yearOfStudy,
      role: user.role,
      accountStatus: user.accountStatus,
      isActive: user.isActive,
      isVerified: user.isVerified,
      profilePictureUrl: user.profilePictureUrl,
      githubUsername: user.githubUsername,
      linkedinUrl: user.linkedinUrl,
      bio: user.bio,
      lastLogin: user.lastLogin,
      membershipStatus: user.member?.membershipStatus || null,
      points: user.member?.points || 0,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("ME endpoint error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}