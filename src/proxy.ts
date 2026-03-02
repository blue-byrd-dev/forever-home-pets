import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "__session";

export const config = {
	matcher: [
		"/account/:path*",
		"/favorites/:path*",
		"/messages/:path*",
	],
};

export function proxy(req: NextRequest) {
	const hasCookie = req.cookies.get(COOKIE_NAME)?.value;

	if (!hasCookie) {
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		url.searchParams.set("next", req.nextUrl.pathname);
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}
