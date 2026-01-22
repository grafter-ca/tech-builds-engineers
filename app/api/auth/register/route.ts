import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, emailExists } from "@/lib/auth";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name is required"),
  studentId: z.string().optional(),
  department: z.string().optional(),
  yearOfStudy: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    // 1. Check if email already exists
    if (await emailExists(data.email)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // 2. Hash the password
    const passwordHash = await hashPassword(data.password);

    // 3. Create User + Member + Verification Token in one transaction
    const newUser = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create the User first
      const createdUser = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          fullName: data.fullName,
          studentId: data.studentId,
          department: data.department,
          yearOfStudy: data.yearOfStudy,
          role: "member",
          accountStatus: "pending",   // starts pending
          isActive: false,            // inactive until verified
          isVerified: false,
        },
      });

      // Create the Member record
      await tx.member.create({
        data: {
          userId: createdUser.user_id,
          membershipStatus: "pending",
          joinDate: new Date(),
        },
      });

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await tx.emailVerificationToken.create({
        data: {
          userId: createdUser.user_id,
          token: hashedToken,
          expiresAt,
        },
      });

      // Return the user (we'll use this to send email)
      return { ...createdUser, verificationToken };
    });

    // After creating the verification token (inside or after transaction)
const verifyLink = `${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/auth/verify?token=${newUser.verificationToken}&email=${encodeURIComponent(data.email)}`;

// Send email
await sendVerificationEmail(data.email, data.fullName, verifyLink);

    // 6. Success response
    return NextResponse.json(
      {
        message: "Registration successful — please check your email to verify your account",
        user: {
          userId: Number(newUser.user_id),
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}