"use client";

import { useFavorites } from "@/lib/favorites/FavoritesContext";
import FavoriteButton from "@/components/favorites/FavoriteButton";

type Snap = {
	name?: string;
	primaryPhoto?: string | null;
	breed?: string | null;
	age?: string | null;
	sex?: string | null;
	city?: string | null;
	state?: string | null;
};

export default function FavoritesPage() {
	const { user, loading, items } = useFavorites();

	if (loading) {
		return <div className="p-6 text-sm opacity-70">Loading favorites…</div>;
	}

	if (!user) {
		return (
			<div className="p-6">
				<h1 className="text-xl font-semibold">Your Favorites</h1>
				<p className="mt-4 text-sm opacity-70">
					Please sign in to view favorites.
				</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			<h1 className="text-xl font-semibold">Your Favorites</h1>

			{items.length === 0 ? (
				<p className="mt-4 text-sm opacity-70">
					You haven’t saved any pets yet.
				</p>
			) : (
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((f) => {
						const a = (f.snapshot ?? {}) as Snap;

						return (
							<article
								key={f.id}
								className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
							>
								<div className="relative aspect-4/3 w-full bg-muted">
									<div className="absolute right-3 top-3 z-10">
										{/* Clicking this heart removes the favorite and the card disappears */}
										<FavoriteButton petId={f.id} snapshot={f.snapshot} />
									</div>

									{a.primaryPhoto ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={a.primaryPhoto}
											alt={a.name ? `Photo of ${a.name}` : "Favorite pet"}
											className="h-full w-full object-cover"
											loading="lazy"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
											No photo available
										</div>
									)}
								</div>

								<div className="p-4">
									<h3 className="text-lg font-semibold">
										{a.name ?? "Unnamed pet"}
									</h3>
									<p className="mt-1 text-sm text-muted-foreground">
										{[a.breed, a.age, a.sex].filter(Boolean).join(" • ") ||
											"Details pending"}
									</p>
									<p className="mt-2 text-sm">
										{[a.city, a.state].filter(Boolean).join(", ") ||
											"Location unavailable"}
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
