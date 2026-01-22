import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { z } from "zod";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { member: true },
    });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.accountStatus !== "active") {
      return NextResponse.json({ error: "Account not active yet" }, { status: 403 });
    }

    // JWT with BigInt converted
    const token = jwt.sign(
      {
        userId: Number(user.user_id),
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Login successful",
      user: {
        userId: Number(user.user_id),
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        membershipStatus: user.member?.membershipStatus || null,
      },
    },
  
    { status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}