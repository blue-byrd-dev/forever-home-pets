import type { Animal } from "@/lib/types/animals";
import AnimalSearchForm from "@/components/animals/AnimalsSearchForm";
import ResultsState from "@/components/animals/ResultsState";
import AnimalGrid from "@/components/animals/AnimalGrid";
import { getAnimals } from "@/lib/data/animal.service";
import type { AnimalsResult } from "@/lib/data/animal.service";
import { getServerUser } from "@/lib/auth/server";
import Link from "next/link";

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
	searchParams?: SearchParams;
}) {
	const sp = searchParams ?? {};

	const postal = (sp.postal ?? "").trim();
	const species = (sp.species ?? "Dog").trim();
	const limit = Math.min(
		60,
		Math.max(1, Number.parseInt(sp.limit ?? "24", 10) || 24),
	);

  const nextUrl = `/animals?postal=${encodeURIComponent(postal)}&species=${encodeURIComponent(species)}&limit=${limit}`;

	const user = await getServerUser();
	const isAuthed = !!user;

	const result = isAuthed
		? await fetchAnimals({ postal, species, limit: String(limit) })
		: null;

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
				{isAuthed && result ? (
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
				) : (
					<div className="rounded-2xl border border-border bg-surface p-8 text-center">
						<h2 className="text-lg font-semibold">Search is members-only</h2>

						<p className="mt-2 text-sm text-text-muted">
							Create a free account to search adoptable pets near you, save
							favorites, and track the pets you love.
						</p>

						<div className="mt-6 flex flex-wrap justify-center gap-4">
							<Link
								href={`/sign-in?next=${encodeURIComponent(nextUrl)}`}
								className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
							>
								Sign In
							</Link>

							<Link
								href={`/sign-up?next=${encodeURIComponent(nextUrl)}`}
								className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-surface"
							>
								Create Free Account
							</Link>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
