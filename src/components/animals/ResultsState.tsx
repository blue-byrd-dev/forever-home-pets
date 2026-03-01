// src/components/animals/ResultsState.tsx
import type { ReactNode } from "react";

type Status = "loading" | "empty" | "error" | "ready";

export default function ResultsState({
	status,
	errorMessage,
	postal,
	species,
	children,
}: {
	status: Status;
	errorMessage?: string;
	postal?: string;
	species?: string;
	children: ReactNode;
}) {
	if (status === "loading") {
		return (
			<div className="rounded-2xl border p-6">
				<p className="text-sm">Loading pets…</p>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="rounded-2xl border p-6">
				<h2 className="text-lg font-semibold">Something went sideways</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					{errorMessage || "Please try again."}
				</p>
				<p className="mt-3 text-xs text-muted-foreground">
					Tip: try removing the zip code or switching species.
				</p>
			</div>
		);
	}

	if (status === "empty") {
		return (
			<div className="rounded-2xl border p-6">
				<h2 className="text-lg font-semibold">No matches found</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					{species ? `${species}s` : "Pets"} {postal ? `near ${postal}` : ""}{" "}
					didn’t show up this time.
				</p>
				<ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
					<li>Try a nearby zip code</li>
					<li>Increase the limit</li>
					<li>Switch Dog/Cat</li>
				</ul>
			</div>
		);
	}

	return <>{children}</>;
}
