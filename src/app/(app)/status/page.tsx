// src/app/status/page.tsx
import Link from "next/link";
import Section from "@/components/ui/Section";

export const metadata = {
	title: "Forever Home — Build Status",
	description: "Current build status for the Forever Home platform.",
};

const LAST_UPDATED = "February 24, 2026";

export default function StatusPage() {
	return (
		<main className="min-h-screen bg-(--background) text-(--text)">
			<div className="mx-auto w-full max-w-3xl px-6 py-12">
				<Link
					href="/"
					className="text-sm font-medium text-zinc-600 hover:text-(--text)"
				>
					← Back
				</Link>

				<h1 className="mt-6 text-3xl font-semibold tracking-tight">
					Build status
				</h1>
				<p className="mt-2 text-sm text-zinc-500">
					Last updated: {LAST_UPDATED}
				</p>

				<div className="mt-8 space-y-4">
					<Section title="Now">
						<ul className="list-disc pl-5 text-zinc-300">
							<li>Project scaffolding and deployment baseline</li>
							<li>
								Rescue data integration onboarding (awaiting access credentials)
							</li>
							<li>Policies + construction shell live</li>
						</ul>
					</Section>

					<Section title="Next">
						<ul className="list-disc pl-5 text-zinc-300">
							<li>Auth + profiles</li>
							<li>Pet search + filters</li>
							<li>Organization profiles</li>
						</ul>
					</Section>

					<Section title="Later">
						<ul className="list-disc pl-5 text-zinc-300">
							<li>Favorites + saved searches</li>
							<li>Inquiry/contact workflow</li>
							<li>Safety + verification enhancements</li>
						</ul>
					</Section>
				</div>

				<div className="mt-10 flex gap-4 text-sm text-zinc-500">
					<Link className="hover:text-zinc-700" href="/privacy">
						Privacy
					</Link>
					<Link className="hover:text-zinc-700" href="/terms">
						Terms
					</Link>
				</div>
			</div>
		</main>
	);
}
