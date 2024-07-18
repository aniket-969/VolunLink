import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// Paths where this middleware should run
export const config = {
  matcher: ['/profile/:path*', '/sign-in', '/sign-up','/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  //   Redirect the user to homepage if the user is already authenticated
  // and trying to access sign-in, sign-up
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && url.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  

  return NextResponse.next();
}
