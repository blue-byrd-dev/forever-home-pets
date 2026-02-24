// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import InfoCard from "@/components/ui/InfoCard";
import StatusRow from "@/components/ui/StatusRow";

export const metadata = {
	title: "Forever Home — Under Construction",
	description:
		"Forever Home is building a modern adoption-first platform connecting future pet parents with ethical rescues and shelters.",
};

export default function HomePage() {
	return (
		<main className="min-h-screen bg-(--background) text-(--text)">
			{/* Top bar */}
			<header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
				<div className="flex items-center gap-3">
					<div className="h-12 w-12 overflow-hidden rounded-xl">
						<Image
							src="/images/foreverHomeLogo.png"
							alt="Forever Home logo"
							width={48}
							height={48}
							className="h-full w-full object-contain"
							priority
						/>
					</div>

					<div className="leading-tight">
						<div className="text-sm font-semibold">Forever Home</div>
						<div className="text-xs text-zinc-500">
							Adoption-first · Ethical by design
						</div>
					</div>
				</div>

				<a
					className="text-sm font-medium text-zinc-600 hover:text-(--text)"
					href="mailto:k.byrd@bluebyrddevelopment.com?subject=Forever%20Home%20Inquiry"
				>
					Contact
				</a>
			</header>

			{/* Hero */}
			<section className="mx-auto w-full max-w-5xl px-6 pb-14 pt-6">
				<div
					className="
            rounded-3xl border border-zinc-200
            bg-linear-to-b from-white/60 to-white/40
            p-8 md:p-12
          "
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700">
						<span
							className="h-2 w-2 rounded-full bg-(--primary)"
							aria-hidden="true"
						/>
						In active development
					</div>

					<h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
						Connecting future pet parents with{" "}
						<span className="text-zinc-600">ethical rescues</span>.
					</h1>

					<p className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
						Forever Home is a modern web app currently being built to help
						people find adoptable pets near them, while supporting verified
						shelters and rescue organizations.
					</p>

					<div className="mt-8 grid gap-4 md:grid-cols-3">
						<InfoCard
							title="Adoption-first"
							body="We focus on rescues, shelters, and verified adoption partners, not private sales."
						/>
						<InfoCard
							title="Location-based search"
							body="Search and filter pets by distance, needs, and household fit (coming soon)."
						/>
						<InfoCard
							title="Built for trust"
							body="Transparent sourcing, clear org details, and anti-fraud design principles."
						/>
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
						<a
							href="mailto:k.byrd@bluebyrddevelopment.com?subject=Forever%20Home%20Inquiry"
							className="inline-flex items-center justify-center rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
						>
							Contact
						</a>

						<Link
							href="/status"
							className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/70 px-4 py-3 text-sm font-semibold text-zinc-800 hover:bg-white"
						>
							View build status
						</Link>
					</div>
				</div>
			</section>

			{/* Ethics + Status */}
			<section className="mx-auto w-full max-w-5xl px-6 pb-16">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl border border-zinc-200 bg-white/50 p-7">
						<h2 className="text-lg font-semibold text-(--accent)">Ethical standards</h2>
						<p className="mt-2 text-sm leading-relaxed text-zinc-900">
							Forever Home does{" "}
							<span className="font-semibold text-(--accent)">not</span> support
							breeders, puppy mills, or private listings. Our goal is to
							spotlight adoptable pets from verified organizations and reduce
							harm caused by unethical marketplaces.
						</p>
						<ul className="mt-4 space-y-2 text-sm text-zinc-900">
							<li>
								• Rescue data integration: In review (awaiting access
								credentials)
							</li>
							<li>• No “for sale” listings or breeding promotion</li>
							<li>• Safety + anti-fraud design baked in</li>
						</ul>
					</div>

					<div className="rounded-3xl border border-zinc-200 bg-white/50 p-7">
						<h2 className="text-lg font-semibold text-(--accent)">
							What’s happening right now
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-zinc-900">
							We’re building the core infrastructure and finalizing API
							integration details with rescue data providers.
						</p>

						<div className="mt-4 space-y-3">
							<StatusRow label="Core app scaffolding" value="In progress" />
							<StatusRow label="Auth + user profiles" value="Planned" />
							<StatusRow
								label="Rescue data integration"
								value="Pending provider approval"
							/>
							<StatusRow label="Search + filters" value="Planned" />
						</div>

						<p className="mt-5 text-xs text-zinc-900">
							Last updated: {new Date().toLocaleDateString()}
						</p>
					</div>
				</div>
			</section>

			<footer className="border-t border-zinc-200 py-10">
				<div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
					<div>© {new Date().getFullYear()} Forever Home</div>
					<div className="flex gap-4">
						<Link className="hover:text-zinc-700" href="/privacy">
							Privacy
						</Link>
						<Link className="hover:text-zinc-700" href="/terms">
							Terms
						</Link>
					</div>
				</div>
			</footer>
		</main>
	);
}

