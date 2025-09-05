import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ad20") {
    const url = request.nextUrl.clone();
    url.pathname = "/";

    const res = NextResponse.redirect(url);

    res.cookies.set("discount", "AD20:20", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  }

  // --- CASE 2: Админ-панель ---
  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin");

  const token = request.cookies.get("admin_session")?.value;

  if (isAdminPage && !isLoginPage) {
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(token, SECRET);

      if (payload.role !== "admin") {
        throw new Error("Unauthorized");
      }

      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      console.log("Invalid token:", error);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/ad20"], // важно: добавляем сюда /ad20
};
