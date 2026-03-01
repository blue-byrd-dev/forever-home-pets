// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import InfoCard from "@/components/ui/InfoCard";
import StatusRow from "@/components/ui/StatusRow";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-background text-text">
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
						<div className="text-xs text-text-muted">
							Adoption-first · Ethical by design
						</div>
					</div>
				</div>

				<a
					className="text-sm font-medium text-text-muted hover:text-text"
					href="mailto:k.byrd@bluebyrddevelopment.com?subject=Forever%20Home%20Inquiry"
				>
					Contact
				</a>
			</header>

			{/* Hero */}
			<section className="mx-auto w-full max-w-5xl px-6 pb-14 pt-6">
				<div className="rounded-3xl border border-border bg-surface p-8 shadow-sm md:p-12">
					<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-text-muted">
						<span
							className="h-2 w-2 rounded-full bg-primary"
							aria-hidden="true"
						/>
						In active development
					</div>

					<h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
						Connecting future pet parents with{" "}
						<span className="text-text-muted">ethical rescues</span>.
					</h1>

					<p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
						Forever Home is a modern web app currently being built to help
						people find adoptable pets near them — while supporting verified
						shelters and rescue organizations.
					</p>

					<div className="mt-8 grid gap-4 md:grid-cols-3">
						<InfoCard
							title="Adoption-first"
							body="We focus on rescues, shelters, and verified adoption partners — not private sales."
						/>
						<InfoCard
							title="Location-based search"
							body="Search adoptable pets by zip code and species. More filters coming next."
						/>
						<InfoCard
							title="Built for trust"
							body="Transparent sourcing, clear org details, and anti-fraud design principles."
						/>
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
						<Link
							href="/animals"
							className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
						>
							Try the pet search (local demo)
						</Link>

						<Link
							href="/status"
							className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-text hover:bg-muted"
						>
							View build status
						</Link>

						<a
							href="mailto:k.byrd@bluebyrddevelopment.com?subject=Forever%20Home%20Partnership"
							className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-text hover:bg-muted"
						>
							Partner / data provider
						</a>
					</div>

					<p className="mt-4 text-xs text-text-muted">
						Note: RescueGroups API calls are server-only. The client app talks
						to our internal API only.
					</p>
				</div>
			</section>

			{/* Ethics + Status */}
			<section className="mx-auto w-full max-w-5xl px-6 pb-16">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl border border-border bg-surface p-7">
						<h2 className="text-lg font-semibold text-accent">
							Ethical standards
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-text-muted">
							Forever Home does{" "}
							<span className="font-semibold text-text">not</span> support
							breeders, puppy mills, or private listings. Our goal is to
							spotlight adoptable pets from verified organizations and reduce
							harm caused by unethical marketplaces.
						</p>
						<ul className="mt-4 space-y-2 text-sm text-text-muted">
							<li>• Verified rescue partners and transparent sourcing</li>
							<li>• No “for sale” listings or breeding promotion</li>
							<li>• Safety + anti-fraud design baked in</li>
						</ul>
					</div>

					<div className="rounded-3xl border border-border bg-surface p-7">
						<h2 className="text-lg font-semibold text-accent">
							What’s happening right now
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-text-muted">
							Core infrastructure is in place — internal API, normalization,
							Firestore caching with TTL, and a working pet search UI (including
							shelter contact actions).
						</p>

						<div className="mt-4 space-y-3">
							<StatusRow label="Internal API + service layer" value="Done" />
							<StatusRow label="Firestore cache + TTL" value="Done" />
							<StatusRow label="Pet search UI (/animals)" value="Done" />
							<StatusRow label="Auth + profiles" value="Next" />
						</div>

						<p className="mt-5 text-xs text-text-muted">
							Last updated: {new Date().toLocaleDateString()}
						</p>
					</div>
				</div>
			</section>

			<footer className="border-t border-border py-10">
				<div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
					<div>© {new Date().getFullYear()} Forever Home</div>
					<div className="flex gap-4">
						<Link className="hover:text-text" href="/privacy">
							Privacy
						</Link>
						<Link className="hover:text-text" href="/terms">
							Terms
						</Link>
					</div>
				</div>
			</footer>
		</main>
	);
}
