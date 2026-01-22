// src/app/api/cohorts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// Helper: only admin or coordinator can manage cohorts
async function requireCoordinatorOrAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    throw new Error("Unauthorized - no token");
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: { role: true },
  });

  if (!user || !["admin", "coordinator"].includes(user.role)) {
    throw new Error("Forbidden - only admins and coordinators can manage cohorts");
  }

  return decoded.userId;
}

// POST /api/cohorts - Create new cohort (admin/coordinator only)
export async function POST(req: NextRequest) {
  try {
    await requireCoordinatorOrAdmin(req);

    const body = await req.json();

    const {
      name,
      year,
      description,
      startDate,
      endDate,
    } = body;

    if (!name || !year) {
      return NextResponse.json(
        { error: "Cohort name and year are required" },
        { status: 400 }
      );
    }

    const cohort = await prisma.cohort.create({
      data: {
        name,
        year: Number(year),
        description: description || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Cohort created successfully",
        cohort,
      },
      { status: 201 }
    );
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : err.message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: err.message || "Failed to create cohort" }, { status });
  }
}

// GET /api/cohorts - List all cohorts (publicly visible, paginated, filterable)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const year = searchParams.get("year") ? Number(searchParams.get("year")) : undefined;
    const search = searchParams.get("search") || undefined;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (year) where.year = year;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [cohorts, total] = await Promise.all([
      prisma.cohort.findMany({
        where,
        include: {
          members: {
            include: {
              user: {
                select: {
                  fullName: true,
                },
              },
            },
          },
        },
        orderBy: { year: "desc" },
        skip,
        take: limit,
      }),
      prisma.cohort.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      cohorts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET /api/cohorts error:", err);
    return NextResponse.json({ error: "Failed to fetch cohorts" }, { status: 500 });
  }
}