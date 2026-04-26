import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/items/add", "/items/manage"];
const AUTH_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("__session")?.value;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/add", "/items/manage", "/login", "/register"],
};
