"use client";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<main className="mx-auto w-full max-w-6xl px-4 py-8">
			<h1 className="text-2xl font-semibold">Something broke.</h1>
			<p className="mt-2 text-sm text-text-muted">{error.message}</p>
			<button
				className="mt-6 rounded-xl border border-border bg-surface px-4 py-2"
				onClick={() => reset()}
			>
				Try again
			</button>
		</main>
	);
}
