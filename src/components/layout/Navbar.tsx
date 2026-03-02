"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/lib/favorites/FavoritesContext";
import LogoutButton from "@/components/auth/LogoutButton";
import Image from "next/image";

type NavItem = {
	href: string;
	label: string;
	public?: boolean;
	protected?: boolean;
	comingSoon?: boolean;
};

const navItems: NavItem[] = [
	{ href: "/", label: "Home", public: true },
	{ href: "/animals", label: "Search", public: true },
	{ href: "/about", label: "About", public: true },

	{ href: "/favorites", label: "Favorites", protected: true },
	{ href: "/account", label: "Account", protected: true },

	{ href: "/shelters", label: "Shelters", public: true, comingSoon: true },
	{ href: "/inbox", label: "Messages", protected: true, comingSoon: true },
];

function cx(...classes: Array<string | false | undefined>) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const pathname = usePathname();
	const { user } = useFavorites();

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
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
					<span>Forever Home</span>
				</Link>

				<nav className="hidden items-center gap-1 sm:flex">
					{navItems.map((item) => {
						// Hide protected items when logged out
						if (item.protected && !user) return null;

						const active = pathname === item.href;

						if (item.comingSoon) {
							return (
								<button
									key={item.href}
									type="button"
									disabled
									title="Coming soon"
									className={cx(
										"rounded-xl px-3 py-2 text-sm font-medium opacity-60",
										"cursor-not-allowed",
									)}
								>
									{item.label}
									<span className="ml-2 text-xs">🔒</span>
								</button>
							);
						}

						return (
							<Link
								key={item.href}
								href={item.href}
								className={cx(
									"rounded-xl px-3 py-2 text-sm font-medium transition",
									"hover:bg-muted",
									active && "bg-muted",
								)}
							>
								{item.label}
							</Link>
						);
					})}

					{user ? (
						<div className="ml-2">
							<LogoutButton />
						</div>
					) : (
						<Link
							href="/login"
							className="ml-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
						>
							Sign in
						</Link>
					)}
				</nav>

				{/* Mobile: keep it simple for now */}
				<div className="sm:hidden">
					<Link
						href={user ? "/account" : "/login"}
						className="rounded-xl border border-border px-3 py-2 text-sm"
					>
						{user ? "Account" : "Sign in"}
					</Link>
				</div>
			</div>
		</header>
	);
}
