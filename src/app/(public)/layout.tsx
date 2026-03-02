import Link from "next/link";
import Image from "next/image";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-background text-text flex flex-col">
			<header className="border-b border-border bg-background">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
					<Link href="/" className="flex items-center gap-2 font-semibold">
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
					</Link>

					<nav className="flex items-center gap-4 text-sm">
						<Link href="/" className="hover:opacity-80">
							Home
						</Link>
						<Link href="/about" className="hover:opacity-80">
							About
						</Link>
						<Link href="/status" className="hover:opacity-80">
							Status
						</Link>
						<a
							className="text-sm font-medium text-text-muted hover:text-text"
							href="mailto:k.byrd@bluebyrddevelopment.com?subject=Forever%20Home%20Inquiry"
						>
							Contact
						</a>
						<Link href="/sign-in" className="hover:opacity-80">
							Sign in
						</Link>
						<Link
							href="/sign-up"
							className="rounded-xl bg-primary px-4 py-2 font-medium text-white hover:opacity-90"
						>
							Create account
						</Link>
					</nav>
				</div>
			</header>

			<div className="flex-1">{children}</div>

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
		</div>
	);
}
