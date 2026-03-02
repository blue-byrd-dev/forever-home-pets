"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";
import Image from "next/image";
import Link from "next/link";
export default function LoginPage({
	mode = "sign-in",
}: {
	mode?: "sign-in" | "sign-up";
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get("next") ?? "/account";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function establishSession(): Promise<void> {
		const user: User | null = auth.currentUser;
		if (!user) throw new Error("No authenticated user.");

		const idToken: string = await user.getIdToken();

		const res = await fetch("/api/auth/session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ idToken }),
		});

		if (!res.ok) {
			const data = (await res.json().catch(() => null)) as {
				detail?: string;
			} | null;
			throw new Error(data?.detail ?? "Session creation failed.");
		}
	}

	async function handleGoogle(): Promise<void> {
		try {
			setError(null);
			setLoading(true);
			await signInWithPopup(auth, googleProvider);
			await establishSession();
			router.replace(next);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Google sign-in failed.");
		} finally {
			setLoading(false);
		}
	}

	async function handleEmail(signup: boolean): Promise<void> {
		try {
			setError(null);
			setLoading(true);

			if (signup) {
				await createUserWithEmailAndPassword(auth, email, password);
			} else {
				await signInWithEmailAndPassword(auth, email, password);
			}

			await establishSession();
			router.replace(next);
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "Email authentication failed.",
			);
		} finally {
			setLoading(false);
		}
	}

	const isSignup = mode === "sign-up";

	return (
		<div className="mx-auto max-w-md p-8">
			<Link href="/" className="flex items-center gap-2 font-semibold">
				<div className="h-70 w-100 overflow-hidden rounded-xl">
					<Image
						src="/images/foreverHomeLogo.png"
						alt="Forever Home logo"
						width={100}
						height={80}
						className="h-full w-full object-contain"
						priority
					/>
				</div>
			</Link>

			<h1 className="mb-6 text-2xl font-semibold">
				{isSignup ? "Create Account" : "Sign In"}
			</h1>

			<button
				onClick={handleGoogle}
				disabled={loading}
				className="mb-4 w-full rounded border px-4 py-2"
			>
				Continue with Google
			</button>

			<div className="mb-4 text-center text-sm opacity-60">or</div>

			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="mb-3 w-full rounded border px-3 py-2"
			/>

			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="mb-4 w-full rounded border px-3 py-2"
			/>

			{isSignup ? (
				<>
					<button
						onClick={() => handleEmail(true)}
						disabled={loading}
						className="mb-3 w-full rounded bg-black px-4 py-2 text-white"
					>
						Create Account
					</button>

					<button
						onClick={() =>
							router.push(`/sign-in?next=${encodeURIComponent(next)}`)
						}
						disabled={loading}
						className="w-full rounded border px-4 py-2"
					>
						Already have an account? Sign In
					</button>
				</>
			) : (
				<>
					<button
						onClick={() => handleEmail(false)}
						disabled={loading}
						className="mb-3 w-full rounded bg-black px-4 py-2 text-white"
					>
						Sign In
					</button>

					<button
						onClick={() =>
							router.push(`/sign-up?next=${encodeURIComponent(next)}`)
						}
						disabled={loading}
						className="w-full rounded border px-4 py-2"
					>
						Create Account
					</button>
				</>
			)}

			{error && <p className="mt-4 text-sm text-red-500">{error}</p>}
		</div>
	);
}
