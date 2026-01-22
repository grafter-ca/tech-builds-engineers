import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.json({ error: "Missing token or email" }, { status: 400 });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const verification = await prisma.emailVerificationToken.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    });

    if (
      !verification ||
      verification.expiresAt < new Date() ||
      verification.user.email !== email
    ) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    if (verification.user.isVerified) {
      return NextResponse.json({
        message: "Email already verified — you can log in",
      });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { user_id: verification.userId },
        data: {
          isVerified: true,
          accountStatus: "active",
          isActive: true,
        },
      }),
      prisma.emailVerificationToken.delete({
        where: { id: verification.id },
      }),
    ]);

    return NextResponse.json({
      message: "Email verified successfully — you can now log in",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
      