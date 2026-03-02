import { requireSession } from "@/lib/auth/session";
import { adminDb } from "@/lib/firebase/admin";

type Snapshot = {
	id: string;
	name: string;
	primaryPhoto: string | null;
	species: string;
	breed: string | null;
	age: string | null;
	sex: string | null;
	city: string | null;
	state: string | null;
	shelterName: string | null;
};

type FavoriteDoc = {
	snapshot?: Snapshot;
};

export default async function FavoritesPage() {
	const { uid } = await requireSession();

	const snap = await adminDb
		.collection("users")
		.doc(uid)
		.collection("favorites")
		.orderBy("createdAt", "desc")
		.limit(100)
		.get();

	const favorites = snap.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as FavoriteDoc),
	}));

	return (
		<div className="p-6">
			<h1 className="text-xl font-semibold">Your Favorites</h1>

			{favorites.length === 0 ? (
				<p className="mt-4 text-sm opacity-70">
					You haven’t saved any pets yet.
				</p>
			) : (
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{favorites.map((f) => {
						const animal = f.snapshot;
						if (!animal) return null;

						return (
							<article
								key={f.id}
								className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
							>
								<div className="aspect-4/3 w-full bg-muted">
									{animal.primaryPhoto ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={animal.primaryPhoto}
											alt={`Photo of ${animal.name}`}
											className="h-full w-full object-cover"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
											No photo available
										</div>
									)}
								</div>

								<div className="p-4">
									<h3 className="text-lg font-semibold">{animal.name}</h3>
									<p className="mt-1 text-sm text-muted-foreground">
										{[animal.breed, animal.age, animal.sex]
											.filter(Boolean)
											.join(" • ")}
									</p>
									<p className="mt-2 text-sm">
										{[animal.city, animal.state].filter(Boolean).join(", ")}
									</p>
								</div>
							</article>
						);
					})}
				</div>
			)}
		</div>
	);
}
