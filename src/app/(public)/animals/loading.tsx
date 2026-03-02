export default function Loading() {
	return (
		<main className="mx-auto w-full max-w-6xl px-4 py-8">
			<div className="mb-6">
				<div className="h-8 w-80 rounded bg-surface" />
				<div className="mt-3 h-4 w-lg rounded bg-surface" />
			</div>

			<section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
				<div className="h-10 w-full rounded bg-white/5" />
				<div className="mt-3 h-10 w-full rounded bg-white/5" />
			</section>

			<section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 12 }).map((_, i) => (
					<div
						key={i}
						className="h-64 rounded-2xl border border-border bg-surface"
					/>
				))}
			</section>
		</main>
	);
}
