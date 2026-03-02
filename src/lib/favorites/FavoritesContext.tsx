"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
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

export type FavoriteItem = {
	id: string; // petId (doc id)
	snapshot?: FavoriteSnapshot;
	createdAt?: unknown;
};

type FavoritesContextType = {
	user: User | null;
	loading: boolean;
	favorites: Set<string>;
	items: FavoriteItem[];
	toggle: (petId: string, snapshot?: FavoriteSnapshot) => Promise<void>;
	isFavorited: (petId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(() => auth.currentUser);
	const [loading, setLoading] = useState<boolean>(true);
	const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
	const [items, setItems] = useState<FavoriteItem[]>(() => []);

	// Listen for auth changes
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			setUser(u);
			setFavorites(new Set());
			setItems([]); 
			setLoading(true);
		});
		return () => unsub();
	}, []);

	// Single Firestore subscription
	useEffect(() => {
		if (!user) {
			queueMicrotask(() => setLoading(false));
			return;
		}

		const favRef = collection(db, "users", user.uid, "favorites");
		const q = query(favRef);

		let unsub: Unsubscribe | null = null;

		unsub = onSnapshot(
			q,
			(snapshot) => {
				const nextSet = new Set<string>();
				const nextItems: FavoriteItem[] = [];

				snapshot.forEach((d) => {
					nextSet.add(d.id);
					const data = d.data() as {
						snapshot?: FavoriteSnapshot;
						createdAt?: unknown;
					};
					nextItems.push({
						id: d.id,
						snapshot: data.snapshot,
						createdAt: data.createdAt,
					});
				});

				setFavorites(nextSet);
				setItems(nextItems);
				setLoading(false);
			},
			() => setLoading(false),
		);

		return () => {
			if (unsub) unsub();
		};
	}, [user]);

	const toggle = useCallback(
		async (petId: string, snapshot?: FavoriteSnapshot) => {
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
		},
		[user, favorites],
	);

	const isFavorited = useCallback(
		(petId: string) => favorites.has(petId),
		[favorites],
	);

	const value = useMemo<FavoritesContextType>(
		() => ({ user, loading, favorites, items, toggle, isFavorited }),
		[user, loading, favorites, items, toggle, isFavorited],
	);

	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	);
}

export function useFavorites() {
	const ctx = useContext(FavoritesContext);
	if (!ctx)
		throw new Error("useFavorites must be used inside FavoritesProvider");
	return ctx;
}
