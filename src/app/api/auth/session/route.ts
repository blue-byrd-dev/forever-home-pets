import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";
import type { DecodedIdToken } from "firebase-admin/auth";

const COOKIE_NAME = "__session";
const EXPIRES_IN = 60 * 60 * 24 * 14 * 1000; // 14 days

function getErrorMessage(err: unknown): string {
	if (err instanceof Error) return err.message;
	if (typeof err === "string") return err;
	try {
		return JSON.stringify(err);
	} catch {
		return "Unknown error";
	}
}

async function upsertUserProfile(uid: string, decoded: DecodedIdToken) {
	const userRef = adminDb.collection("users").doc(uid);

	// DecodedIdToken.firebase is optional, so guard it.
	const provider = decoded.firebase?.sign_in_provider ?? null;
	const providers = provider ? [provider] : [];

	await adminDb.runTransaction(async (tx) => {
		const snap = await tx.get(userRef);

		// These fields may or may not exist depending on provider
		const email = decoded.email ?? null;

		// Firebase token standard claims:
		// - name / picture often exist for Google, sometimes for Apple (and not always after first consent)
		const displayName = typeof decoded.name === "string" ? decoded.name : null;
		const photoURL = typeof decoded.picture === "string" ? decoded.picture : null;

		if (snap.exists) {
			tx.set(
				userRef,
				{
					email,
					displayName,
					photoURL,
					providers,
					updatedAt: Timestamp.now(),
				},
				{ merge: true },
			);
		} else {
			tx.set(
				userRef,
				{
					uid,
					email,
					displayName,
					photoURL,
					providers,
					createdAt: Timestamp.now(),
					updatedAt: Timestamp.now(),
				},
				{ merge: true },
			);
		}
	});
}

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as { idToken?: string };
		const idToken = body.idToken;

		if (!idToken) {
			return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
		}

		const decoded = await adminAuth.verifyIdToken(idToken);

		const sessionCookie = await adminAuth.createSessionCookie(idToken, {
			expiresIn: EXPIRES_IN,
		});

		await upsertUserProfile(decoded.uid, decoded);

		const jar = await cookies();
		jar.set(COOKIE_NAME, sessionCookie, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: EXPIRES_IN / 1000,
		});

		return NextResponse.json({ ok: true });
	} catch (err: unknown) {
		return NextResponse.json(
			{
				error: "Session creation failed",
				detail: getErrorMessage(err),
			},
			{ status: 401 },
		);
	}
}

export async function DELETE() {
	const jar = await cookies();
	jar.set(COOKIE_NAME, "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});

	return NextResponse.json({ ok: true });
}
