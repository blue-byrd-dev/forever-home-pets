"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function DebugAuth() {
	const { user, loading } = useAuth();

	useEffect(() => {
		if (!loading && user) {
			console.log("Firebase UID:", user.uid);
		}
	}, [user, loading]);

	return null; // renders nothing
}
