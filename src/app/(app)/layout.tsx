import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FavoritesProvider } from "@/lib/favorites/FavoritesContext";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<FavoritesProvider>
			<Navbar />
			<main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
			<Footer />
		</FavoritesProvider>
	);
}
