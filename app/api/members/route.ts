// src/app/api/members/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// Helper: get userId and check admin/coordinator role
async function getAdminUserId(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized - no token");

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: { role: true },
  });

  if (!user || !["admin", "coordinator"].includes(user.role)) {
    throw new Error("Forbidden - insufficient permissions");
  }

  return decoded.userId;
}

export async function GET(req: NextRequest) {
  try {
    await getAdminUserId(req);

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { user: { fullName: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { user: { studentId: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (status) {
      whereClause.membershipStatus = status;
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              fullName: true,
              email: true,
              studentId: true,
              department: true,
              yearOfStudy: true,
              accountStatus: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { joinDate: "desc" },
      }),
      prisma.member.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      success: true,
      members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : err.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json(
      { error: err.message || "Failed to fetch members" },
      { status }
    );
  }
}