export const runtime = "nodejs";

import "server-only";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { redirect } from "next/navigation";

const COOKIE_NAME = "__session";

export async function getSession() {
	const jar = await cookies();
	const cookie = jar.get(COOKIE_NAME)?.value;
	if (!cookie) return null;

	try {
		const decoded = await adminAuth.verifySessionCookie(cookie, true);
		return { uid: decoded.uid, decoded };
	} catch {
		return null;
	}
}

export async function requireSession() {
	const session = await getSession();
	if (!session) redirect("/login");
	return session;
}
