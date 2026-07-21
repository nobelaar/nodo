import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({
            request,
          });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  return { response, supabase };
}

const PROTECTED_PREFIXES = ["/onboarding", "/profile"];
const AUTH_PREFIXES = ["/auth/login", "/auth/signup", "/auth/recovery", "/auth/reset-password"];

export default async function proxy(request: NextRequest) {
  const { response, supabase } = updateSession(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) || pathname === "/";
  const isAuthPage = AUTH_PREFIXES.some((p) => pathname.startsWith(p));

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!user && isProtected) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
