import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import intlMiddleware from "next-intl/middleware";
import {
	type NextFetchEvent,
	type NextRequest,
	NextResponse,
} from "next/server";
import { routing } from "@/i18n/routing";

export default async function middleware(
	request: NextRequest,
	event: NextFetchEvent,
) {
  const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    ...routing.locales.flatMap(l => [
      `/${l}`,
      `/${l}/sign-in/(.*)`
    ])
  ]);

	const authMiddleware = clerkMiddleware(async (auth, request) => {
		if (!isPublicRoute(request)) {
			await auth.protect();
		}
		return intlMiddleware(routing)(request);
	});

	return (await authMiddleware(request, event)) || NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next|_vercel|.*\\..*|api|trpc).*)"],
};
