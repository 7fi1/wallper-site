import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("✅ Middleware is running for:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin");

  const session = request.cookies.get("admin_session");

  console.log("Session cookie value:", session?.value);

  if (isAdminPage && !isLoginPage && session?.value !== "valid") {
    console.log("Redirecting to login page...");
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
