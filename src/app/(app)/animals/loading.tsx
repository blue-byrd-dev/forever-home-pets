// src/app/(app)/animals/loading.tsx
export default function LoadingAnimals() {
	return (
		<main className="mx-auto w-full max-w-6xl px-4 py-8">
			<header className="mb-6">
				<div className="h-9 w-72 animate-pulse rounded-lg bg-muted" />
				<div className="mt-3 h-4 w-lg max-w-full animate-pulse rounded bg-muted" />
			</header>

			<section className="rounded-2xl border bg-background p-4 shadow-sm">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
					<div className="md:col-span-4">
						<div className="h-4 w-36 animate-pulse rounded bg-muted" />
						<div className="mt-2 h-10 w-full animate-pulse rounded-xl bg-muted" />
					</div>

					<div className="md:col-span-4">
						<div className="h-4 w-20 animate-pulse rounded bg-muted" />
						<div className="mt-2 h-10 w-full animate-pulse rounded-xl bg-muted" />
					</div>

					<div className="md:col-span-2">
						<div className="h-4 w-14 animate-pulse rounded bg-muted" />
						<div className="mt-2 h-10 w-full animate-pulse rounded-xl bg-muted" />
					</div>

					<div className="md:col-span-2 flex items-end">
						<div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
					</div>
				</div>

				<div className="mt-4 flex items-center justify-between">
					<div className="h-4 w-56 animate-pulse rounded bg-muted" />
					<div className="h-10 w-28 animate-pulse rounded-xl bg-muted" />
				</div>
			</section>

			<section className="mt-8">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 12 }).map((_, i) => (
						<div
							key={i}
							className="overflow-hidden rounded-2xl border bg-background shadow-sm"
						>
							<div className="aspect-4/3 w-full animate-pulse bg-muted" />
							<div className="p-4">
								<div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
								<div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
								<div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-muted" />
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
