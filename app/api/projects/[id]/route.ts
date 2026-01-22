// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

async function getUserContext(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: { role: true },
  });

  if (!user) throw new Error("User not found");

  return { userId: decoded.userId, role: user.role };
}

// GET /api/projects/:id - Get single project
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number(params.id);
    if (isNaN(projectId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const project = await prisma.project.findUnique({
      where: { project_id: projectId },
      include: {
        createdBy: { select: { fullName: true } },
        members: { include: { user: { select: { fullName: true } } } },
      },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    return NextResponse.json({ success: true, project });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// PATCH /api/projects/:id - Update project (creator or admin)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, role } = await getUserContext(req);
    const projectId = Number(params.id);

    const project = await prisma.project.findUnique({
      where: { project_id: projectId },
      select: { createdById: true },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const isCreator = project.createdById === BigInt(userId);
    const isAdmin = ["admin", "coordinator"].includes(role);

    if (!isCreator && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized to update this project" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await prisma.project.update({
      where: { project_id: projectId },
      data: body,
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update project" }, { status: 500 });
  }
}

// DELETE /api/projects/:id - Delete project (creator or admin)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, role } = await getUserContext(req);
    const projectId = Number(params.id);

    const project = await prisma.project.findUnique({
      where: { project_id: projectId },
      select: { createdById: true },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const isCreator = project.createdById === BigInt(userId);
    const isAdmin = ["admin", "coordinator"].includes(role);

    if (!isCreator && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized to delete this project" }, { status: 403 });
    }

    await prisma.project.delete({ where: { project_id: projectId } });

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}