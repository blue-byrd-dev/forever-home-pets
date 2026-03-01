// src/app/status/page.tsx
import Link from "next/link";
import Section from "@/components/ui/Section";

export default function StatusPage() {
	return (
		<main className="min-h-screen bg-background text-text">
			<div className="mx-auto w-full max-w-3xl px-6 py-12">
				<Link
					href="/"
					className="text-sm font-medium text-text-muted hover:text-text"
				>
					← Back
				</Link>

				<h1 className="mt-6 text-3xl font-semibold tracking-tight">
					Build status
				</h1>
				<p className="mt-3 text-text-muted">
					This is a living status page for partners and stakeholders.
				</p>

				<div className="mt-8 space-y-4">
					<Section title="Now">
						<ul className="list-disc pl-5 text-text-muted">
							<li>Internal API + normalization layer</li>
							<li>Firestore caching + TTL</li>
							<li>Search UI: /animals</li>
						</ul>
					</Section>

					<Section title="Next">
						<ul className="list-disc pl-5 text-text-muted">
							<li>Auth + profiles</li>
							<li>Favorites + saved searches</li>
							<li>Organization profiles</li>
						</ul>
					</Section>

					<Section title="Later">
						<ul className="list-disc pl-5 text-text-muted">
							<li>Inquiry/contact workflow</li>
							<li>Safety/verification enhancements</li>
							<li>More filters (distance, needs, household fit)</li>
						</ul>
					</Section>
				</div>
			</div>
		</main>
	);
}
