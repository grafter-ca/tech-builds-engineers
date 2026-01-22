import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "./lib/prisma";

export const runtime = "nodejs";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-1234567890";

// Public paths that don't need auth
const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify",
  "/",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip middleware for static assets, Next.js internals, and public files
  if (
    pathname.startsWith("/_next") ||                    // Next.js static files
    pathname.startsWith("/favicon.ico") || 
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/manifest.json") ||
    pathname.startsWith("/images/") ||                  // your public images
    pathname.startsWith("/icons/") ||                   // if you have icons folder
    /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js)$/.test(pathname)  // any file with extension
  ) {
    return NextResponse.next();
  }

  // Allow all /api/auth/* routes (login, register, verify, forgot, reset)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow public pages
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from httpOnly cookie
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No token → redirect to login (pages) or 401 (API)
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized — no token" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string; role: string };

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/projects/my") || pathname.startsWith("/inventory")) {
  const member = await prisma.member.findUnique({ where: { userId: decoded.userId } });
  if (!member || member.membershipStatus !== "active") {
    return NextResponse.redirect(new URL("/membership/upgrade", req.url));
  }
}

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
      role: string;
    };

    // Attach user info to request headers (for API routes & server components)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId.toString());
    requestHeaders.set("x-user-email", decoded.email);
    requestHeaders.set("x-user-role", decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Invalid token in middleware:", error);

    // Invalid token → clear cookie
    const response = pathname.startsWith("/api")
      ? NextResponse.json({ error: "Unauthorized — invalid token" }, { status: 401 })
      : NextResponse.redirect(new URL("/auth/login", req.url));

    response.cookies.delete("token");
    return response;
  }
}

// Apply middleware to everything EXCEPT static/public assets
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, manifest.json
     * - files with extensions (images, css, js in public)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};