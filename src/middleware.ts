import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutesPrefix,
  allowedOrigins,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "routes";
import { adminRoles } from "./lib/admin-config";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = await getToken({
      req,
    });
    const isAuth = !!token;

    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));
    const isAdminPage = pathname.startsWith(adminRoutesPrefix);
    const isAdmin = isAuth && adminRoles.includes(token.role);

    if (isApiAuthRoute) {
      return null;
    }

    if (isAdminPage) {
      if (!isAdmin) {
        return NextResponse.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl),
        );
      }
      return null;
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl),
        );
      }
      return null;
    }

    if (isPublicRoute) {
      return null;
    }

    return null;
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
