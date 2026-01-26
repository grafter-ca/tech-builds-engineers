import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeBigInt } from "@/lib/serialize";

// /api/dashboard/admin/route.ts
export async function GET(req: NextRequest) {

  const [
    users,
    projects,
    inventory,
    logs,
  ] = await Promise.all([
    prisma.user.findMany({
      include: { member: true },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      include: {
        createdBy: { select: { fullName: true } },
        members: true,
      },
      take: 5,
      orderBy: { updatedAt: "desc" },
    }),

    prisma.inventoryItem.findMany({
      where: { item_id: { lt: 5 } },
    }),

    prisma.inventoryLoan.findMany({
      take: 10,
      orderBy: { userId: "desc" },
    }),
  ]);

  return NextResponse.json(
    serializeBigInt({
      users,
      projects,
      inventory,
      logs,
    })
  );
}
