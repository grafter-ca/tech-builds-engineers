// src/app/api/projects/my/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// GET /api/projects/my - List projects where I am creator or team member
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { createdById: decoded.userId },
          { members: { some: { userId: decoded.userId } } },
        ],
      },
      include: {
        createdBy: { select: { fullName: true } },
        members: { include: { user: { select: { fullName: true } } } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, projects });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch my projects" }, { status: 500 });
  }
}