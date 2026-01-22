// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// Helper: Get userId and verify active membership + role
async function getUserContext(req: NextRequest, requireActiveMembership = true) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized - no token");

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: { role: true },
  });

  if (!user) throw new Error("User not found");

  if (requireActiveMembership) {
    const member = await prisma.member.findUnique({
      where: { userId: decoded.userId },
      select: { membershipStatus: true },
    });

    if (!member || member.membershipStatus !== "active") {
      throw new Error("Active membership required");
    }
  }

  return { userId: decoded.userId, role: user.role };
}

// POST /api/projects - Create new project (admin or coordinator only)
export async function POST(req: NextRequest) {
  try {
    const { userId, role } = await getUserContext(req, false); // no membership check for creation

    if (!["admin", "coordinator"].includes(role)) {
      return NextResponse.json(
        { error: "Only admins or coordinators can create projects" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, githubUrl, demoUrl, presentationUrl, coverImageUrl } = body;

    if (!title) {
      return NextResponse.json({ error: "Project title is required" }, { status: 400 });
    }

    // Generate slug from title
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description: description || null,
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
        presentationUrl: presentationUrl || null,
        coverImageUrl: coverImageUrl || null,
        status: "idea",
        createdById: userId,
      },
    });

    // Auto-add creator as lead
    await prisma.projectMember.create({
      data: {
        projectId: project.project_id,
        userId,
        role: "lead",
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : 403;
    return NextResponse.json({ error: err.message || "Failed to create project" }, { status });
  }
}

// GET /api/projects - List public projects (paginated, searchable)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    const skip = (page - 1) * limit;

    const where: any = { status: { not: "archived" } };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) where.status = status;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          createdBy: { select: { fullName: true } },
          members: { include: { user: { select: { fullName: true } } } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      projects,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}