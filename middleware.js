import { NextResponse } from "next/server";

export async function middleware(req) {
  const session =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__secure-next-auth.session-token");

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
