import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  const session = request.cookies.get("admin_session");

  console.log("Session cookie value: ", session?.value);

  // Если пользователь пытается попасть на страницу админа без сессии
  if (isAdminPage && !isLoginPage && session?.value !== "valid") {
    console.log("Redirecting to login page...");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Если сессия валидна, а пользователь не на странице логина, пропускаем запрос
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
export default middleware;
