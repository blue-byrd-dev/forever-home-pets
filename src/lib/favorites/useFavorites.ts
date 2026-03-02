"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	type Unsubscribe,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";

export type FavoriteSnapshot = Record<string, unknown>;

type FavoritesState = {
	user: User | null;
	loading: boolean;
	favorites: Set<string>;
	toggle: (petId: string, snapshot?: FavoriteSnapshot) => Promise<void>;
	isFavorited: (petId: string) => boolean;
};

export function useFavorites(): FavoritesState {
	const [user, setUser] = useState<User | null>(() => auth.currentUser);
	const [loading, setLoading] = useState<boolean>(() => !!auth.currentUser);
	const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

	// Auth subscription: updates happen in callback (good)
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			setUser(u);

			// Schedule state updates to avoid "sync setState inside effect" warnings
			queueMicrotask(() => {
				if (!u) {
					setFavorites(new Set());
					setLoading(false);
				} else {
					setLoading(true);
				}
			});
		});

		return () => unsub();
	}, []);

	// Favorites subscription: only runs when user exists
	useEffect(() => {
		if (!user) return;

		const favsRef = collection(db, "users", user.uid, "favorites");
		const q = query(favsRef);

		let unsub: Unsubscribe | null = null;

		unsub = onSnapshot(
			q,
			(snap) => {
				const next = new Set<string>();
				snap.forEach((d) => next.add(d.id));
				setFavorites(next);
				setLoading(false);
			},
			() => {
				setLoading(false);
			},
		);

		return () => {
			if (unsub) unsub();
		};
	}, [user]);

	const isFavorited = useMemo(() => {
		return (petId: string) => favorites.has(petId);
	}, [favorites]);

	async function toggle(petId: string, snapshot?: FavoriteSnapshot): Promise<void> {
		if (!user) throw new Error("Not signed in.");

		const favDoc = doc(db, "users", user.uid, "favorites", petId);

		if (favorites.has(petId)) {
			await deleteDoc(favDoc);
		} else {
			await setDoc(
				favDoc,
				{
					petId,
					createdAt: serverTimestamp(),
					...(snapshot ? { snapshot } : {}),
				},
				{ merge: true },
			);
		}
	}

	return { user, loading, favorites, toggle, isFavorited };
}
