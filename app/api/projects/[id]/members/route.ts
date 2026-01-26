// src/app/api/projects/[id]/members/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

async function getCreatorOrAdminContext(req: NextRequest, projectId: number) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

  const project = await prisma.project.findUnique({
    where: { project_id: projectId },
    select: { createdById: true },
  });

  if (!project) throw new Error("Project not found");

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
    select: { role: true },
  });

  const isCreator = project.createdById === BigInt(decoded.userId);
  const isAdmin = ["admin", "coordinator"].includes(user?.role || "");

  if (!isCreator && !isAdmin) {
    throw new Error("Unauthorized to manage project members");
  }

  return decoded.userId;
}

// POST /api/projects/:id/members - Add member to project
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const projectId = Number((await params).id);
    if (isNaN(projectId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await getCreatorOrAdminContext(req, projectId);

    const body = await req.json();
    const { userId: newMemberId, role = "contributor" } = body;

    if (!newMemberId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Ensure target user is active member
    const targetMember = await prisma.member.findUnique({
      where: { userId: newMemberId },
      select: { membershipStatus: true },
    });

    if (!targetMember || targetMember.membershipStatus !== "active") {
      return NextResponse.json({ error: "User must be an active member to join" }, { status: 400 });
    }

    await prisma.projectMember.create({
      data: {
        projectId,
        userId: newMemberId,
        role,
      },
    });

    return NextResponse.json({ success: true, message: "Member added" }, { status: 201 });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : 403;
    return NextResponse.json({ error: err.message || "Failed to add member" }, { status });
  }
}

// DELETE /api/projects/:id/members/:userId - Remove member
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string, userId: string }> }) {
  try {
    const projectId = Number((await params).id);
    const targetUserId = Number((await params).userId);

    if (isNaN(projectId) || isNaN(targetUserId)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    await getCreatorOrAdminContext(req, projectId);

    await prisma.projectMember.delete({
      where: {
        projectId_userId: { projectId, userId: targetUserId },
      },
    });

    return NextResponse.json({ success: true, message: "Member removed" });
  } catch (err: any) {
    const status = err.message.includes("Unauthorized") ? 401 : 403;
    return NextResponse.json({ error: err.message || "Failed to remove member" }, { status });
  }
}