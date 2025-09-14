// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const promoEnd = new Date("2025-09-17T21:59:59Z");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin");
  if (isAdminPage && !isLoginPage) {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (payload.role !== "admin") throw new Error("Unauthorized");
    } catch {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  let response: NextResponse;
  if (pathname === "/ad20") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    response = NextResponse.redirect(url);
    response.cookies.set("discount", "AD20:20", {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } else {
    response = NextResponse.next();
  }

  if (new Date() < promoEnd) {
    response.cookies.set("discount", "WALLPER10K:50", {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/ad20",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|_next/data|_vercel|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
