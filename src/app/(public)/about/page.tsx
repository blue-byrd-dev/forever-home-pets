export const metadata = {
	title: "About Forever Home",
	description:
		"Forever Home is building an adoption-first platform that connects future pet parents with ethical rescues and shelters.",
};

export default function AboutPage() {
	return (
		<main className="mx-auto w-full max-w-5xl px-4 py-12">
			{/* Hero */}
			<section className="mb-16">
				<h1 className="text-4xl font-semibold tracking-tight">
					Adoption first. Always.
				</h1>

				<p className="mt-6 text-lg text-text-muted leading-relaxed">
					Forever Home was created with one goal: make ethical pet adoption
					easier, more transparent, and more humane.
				</p>
			</section>

			{/* Mission */}
			<section className="mb-16 grid gap-10 md:grid-cols-2">
				<div>
					<h2 className="text-2xl font-semibold mb-4">Why we exist</h2>
					<p className="text-text-muted leading-relaxed">
						Millions of adoptable animals are waiting in shelters and rescues.
						Yet the adoption process can feel fragmented, outdated, or
						overwhelming.
					</p>
					<p className="mt-4 text-text-muted leading-relaxed">
						Forever Home is building a modern, adoption-first platform that
						removes noise and connects future pet parents directly with ethical
						rescue organizations.
					</p>
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-4">What we stand for</h2>
					<ul className="space-y-3 text-text-muted">
						<li>• No breeders</li>
						<li>• No puppy mills</li>
						<li>• No backyard operations</li>
						<li>• Rescue-first partnerships</li>
						<li>• Transparent adoption journeys</li>
					</ul>
				</div>
			</section>

			{/* Vision */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold mb-6">The bigger vision</h2>
				<p className="text-text-muted leading-relaxed">
					We believe adoption should feel intentional. Not transactional.
					Technology should reduce friction, not replace responsibility.
				</p>

				<p className="mt-4 text-text-muted leading-relaxed">
					Our roadmap includes favorites syncing, application tracking, rescue
					communication tools, and improved discovery, all built with long-term
					placement success in mind.
				</p>
			</section>

			{/* CTA */}
			<section className="rounded-2xl border border-border bg-surface p-10 text-center">
				<h2 className="text-2xl font-semibold">
					Ready to meet your forever friend?
				</h2>

				<p className="mt-4 text-text-muted">
					Create a free account to search adoptable pets near you and save the
					ones you love.
				</p>

				<div className="mt-6 flex justify-center gap-4">
					<a
						href="/sign-up"
						className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90"
					>
						Create Free Account
					</a>

					<a
						href="/animals"
						className="rounded-xl border border-border px-6 py-3 text-sm font-medium hover:bg-background"
					>
						Browse Pets
					</a>
				</div>
			</section>
		</main>
	);
}
