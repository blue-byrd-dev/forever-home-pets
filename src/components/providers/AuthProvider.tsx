"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { ensureUser } from "@/lib/firebase/authInit";
import { upsertUserProfile } from "@/lib/firebase/userRepo";

type AuthContextType = {
	user: User | null;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		ensureUser().then(async (u) => {
			setUser(u);
			setLoading(false);

			await upsertUserProfile({
				uid: u.uid,
				email: u.email ?? null,
				displayName: u.displayName ?? null,
				photoURL: u.photoURL ?? null,
			});
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
