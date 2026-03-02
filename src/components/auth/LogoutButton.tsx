"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function LogoutButton() {
	const router = useRouter();

	async function onLogout() {
		// 1) sign out client SDK (clears client state)
		await signOut(auth);

		// 2) clear server session cookie
		await fetch("/api/auth/session", { method: "DELETE" });

		router.replace("/login");
	}

	return (
		<button onClick={onLogout} className="rounded border px-3 py-2 text-sm">
			Sign out
		</button>
	);
}
