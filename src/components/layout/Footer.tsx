import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-16 border-t border-border">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
				<div className="text-sm opacity-80">
					<div className="font-semibold opacity-100">Forever Home</div>
					<div className="mt-1">Adoption-first. Anti-mill. Pro-rescue.</div>
				</div>

				<div className="flex flex-wrap gap-3 text-sm">
					<Link className="rounded-lg px-2 py-1 hover:bg-muted" href="/about">
						About
					</Link>
					<Link className="rounded-lg px-2 py-1 hover:bg-muted" href="/privacy">
						Privacy
					</Link>
					<Link className="rounded-lg px-2 py-1 hover:bg-muted" href="/terms">
						Terms
					</Link>
					<span className="rounded-lg px-2 py-1 opacity-60">
						Funding: coming soon
					</span>
				</div>
			</div>
		</footer>
	);
}
