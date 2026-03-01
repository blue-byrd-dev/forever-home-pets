// src/components/animals/AnimalCard.tsx
import type { Animal } from "@/lib/types/animals";

function formatMeta(animal: Animal) {
	const parts = [animal.breed, animal.age, animal.sex].filter(
		(p): p is string => typeof p === "string" && p.trim().length > 0,
	);
	return parts.join(" • ");
}

function formatLocation(animal: Animal, searchedPostal?: string) {
	const city = animal.city?.trim() ?? "";
	const state = animal.state?.trim() ?? "";

	if (city && state) return `${city}, ${state}`;
	if (state) return state;
	if (searchedPostal) return `Near ${searchedPostal}`;
	return "Location unavailable";
}

export default function AnimalCard({ animal }: { animal: Animal }) {
	const meta = formatMeta(animal);
	const location = formatLocation(animal);

	return (
		<article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:shadow-md">
			<div className="aspect-4/3 w-full bg-muted">
				{animal.primaryPhoto ? (
					// Using <img> is fine for external images; switch to next/image later if you want
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={animal.primaryPhoto}
						alt={`Photo of ${animal.name}`}
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center">
						<span className="text-xs text-text-muted">No photo available</span>
					</div>
				)}
			</div>

			<div className="p-4">
				<h3 className="text-lg font-semibold leading-tight">{animal.name}</h3>

				{meta ? (
					<p className="mt-1 text-sm text-muted-foreground">{meta}</p>
				) : (
					<p className="mt-1 text-sm text-muted-foreground">Details pending</p>
				)}

				<p className="mt-2 text-sm">{location}</p>

				<div className="mt-3 flex flex-wrap items-center gap-2">
					{animal.shelterPhone ? (
						<a
							href={`tel:${animal.shelterPhone.replace(/[^\d+]/g, "")}`}
							className="inline-flex items-center justify-center rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
							aria-label={`Call ${animal.shelterName ?? "shelter"} about ${animal.name}`}
						>
							Call
						</a>
					) : null}

					{animal.shelterEmail ? (
						<a
							href={`mailto:${animal.shelterEmail}?subject=${encodeURIComponent(
								`Inquiry about ${animal.name}`,
							)}`}
							className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-muted"
						>
							Email
						</a>
					) : null}

					{animal.shelterUrl ? (
						<a
							href={animal.shelterUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-muted"
						>
							Shelter site
						</a>
					) : null}

					{animal.shelterName ? (
						<span className="text-xs text-text-muted">
							{animal.shelterName}
						</span>
					) : null}

					{animal.rescueId ? (
						<span className="text-xs text-text-muted">
							Shelter ID: {animal.rescueId}
						</span>
					) : null}
				</div>
			</div>
		</article>
	);
}
