// src/components/animals/AnimalSearchForm.tsx
"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
	initialPostal: string;
	initialSpecies: string;
	initialLimit: number;
};

const SPECIES_OPTIONS = ["Dog", "Cat"] as const;
type Species = (typeof SPECIES_OPTIONS)[number];

const LIMIT_OPTIONS = [12, 24, 36, 60] as const;
type Limit = (typeof LIMIT_OPTIONS)[number];

function isSpecies(value: string): value is Species {
	return (SPECIES_OPTIONS as readonly string[]).includes(value);
}

function isLimit(value: number): value is Limit {
	return (LIMIT_OPTIONS as readonly number[]).includes(value);
}

export default function AnimalSearchForm({
	initialPostal,
	initialSpecies,
	initialLimit,
}: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [postal, setPostal] = useState(initialPostal);
	const [species, setSpecies] = useState<Species>(
		isSpecies(initialSpecies) ? initialSpecies : "Dog",
	);
	const [limit, setLimit] = useState<Limit>(
		isLimit(initialLimit) ? initialLimit : 24,
	);

	const currentParams = useMemo(() => {
		return new URLSearchParams(searchParams?.toString());
	}, [searchParams]);

	function applyParams(next: {
		postal: string;
		species: Species;
		limit: Limit;
	}) {
		const p = new URLSearchParams(currentParams);

		const cleanedPostal = next.postal.trim();
		if (cleanedPostal) p.set("postal", cleanedPostal);
		else p.delete("postal");

		p.set("species", next.species);
		p.set("limit", String(next.limit));

		startTransition(() => {
			router.push(`${pathname}?${p.toString()}`);
		});
	}

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		applyParams({ postal, species, limit });
	}

	function onShowMore() {
		const next = Math.min(60, (limit + 12) as number);
		const nextLimit: Limit = isLimit(next) ? next : 60;
		setLimit(nextLimit);
		applyParams({ postal, species, limit: nextLimit });
	}

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
				<div className="md:col-span-4">
					<label className="block text-sm font-medium" htmlFor="postal">
						Zip / Postal Code
					</label>
					<input
						id="postal"
						name="postal"
						inputMode="numeric"
						autoComplete="postal-code"
						placeholder="e.g. 75201"
						value={postal}
						onChange={(e) => setPostal(e.target.value)}
						className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
					/>
				</div>

				<div className="md:col-span-4">
					<label className="block text-sm font-medium" htmlFor="species">
						Species
					</label>
					<select
						id="species"
						name="species"
						value={species}
						onChange={(e) => setSpecies(e.target.value as Species)}
						className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
					>
						{SPECIES_OPTIONS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium" htmlFor="limit">
						Limit
					</label>
					<select
						id="limit"
						name="limit"
						value={limit}
						onChange={(e) => setLimit(Number(e.target.value) as Limit)}
						className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
					>
						{LIMIT_OPTIONS.map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
				</div>

				<div className="md:col-span-2 flex items-end gap-2">
					<button
						type="submit"
						disabled={isPending}
						className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
					>
						{isPending ? "Searching..." : "Search"}
					</button>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-3">
				<p className="text-xs text-muted-foreground">
					Results come from our internal API only.
				</p>

				<button
					type="button"
					onClick={onShowMore}
					disabled={isPending || limit >= 60}
					className="rounded-xl border px-4 py-2 text-sm font-medium disabled:opacity-60"
				>
					Show more
				</button>
			</div>
		</form>
	);
}
