// src/app/(app)/animals/page.tsx
import type { Animal } from "@/lib/types/animals";
import AnimalSearchForm from "@/components/animals/AnimalsSearchForm";
import ResultsState from "@/components/animals/ResultsState";
import AnimalGrid from "@/components/animals/AnimalGrid";
import { getAnimals } from "@/lib/data/animal.service";
import type { AnimalsResult } from "@/lib/data/animal.service";

export const dynamic = "force-dynamic";

type SearchParams = {
	postal?: string;
	species?: string;
	limit?: string;
};

type UiResult =
	| { ok: true; animals: Animal[]; data: AnimalsResult }
	| { ok: false; animals: Animal[]; error: string };

async function fetchAnimals(searchParams: SearchParams): Promise<UiResult> {
	try {
		const postal = (searchParams.postal ?? "").trim() || undefined;
		const species = (searchParams.species ?? "Dog").trim() || undefined;

		const limit =
			searchParams.limit != null
				? Math.min(
						60,
						Math.max(1, Number.parseInt(searchParams.limit, 10) || 24),
					)
				: undefined;

		console.log("[AnimalsPage] fetching animals…");
		const data = await getAnimals({ postal, species, limit });

		return { ok: true, animals: data.animals, data };
	} catch (err) {
		console.error("[AnimalsPage] getAnimals failed:", err);
		return {
			ok: false,
			animals: [],
			error: err instanceof Error ? err.message : "Something went sideways.",
		};
	}
}

export default async function AnimalsPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const sp = await searchParams;

	const postal = (sp.postal ?? "").trim();
	const species = (sp.species ?? "Dog").trim();
	const limit = Math.min(
		60,
		Math.max(1, Number.parseInt(sp.limit ?? "24", 10) || 24),
	);

	const result = await fetchAnimals({ postal, species, limit: String(limit) });

	return (
		<main className="mx-auto w-full max-w-6xl px-4 py-8">
			<header className="mb-6">
				<h1 className="text-3xl font-semibold tracking-tight">
					Find your forever friend
				</h1>
				<p className="mt-2 text-sm text-text-muted">
					Search adoptable pets near you. No breeders. No mills. Just rescues.
				</p>
			</header>

			<section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
				<AnimalSearchForm
					initialPostal={postal}
					initialSpecies={species}
					initialLimit={limit}
				/>
			</section>

			<section className="mt-8">
				<ResultsState
					status={
						result.ok
							? result.animals.length > 0
								? "ready"
								: "empty"
							: "error"
					}
					errorMessage={result.ok ? undefined : result.error}
					postal={postal}
					species={species}
				>
					<AnimalGrid animals={result.animals} />
				</ResultsState>
			</section>
		</main>
	);
}
