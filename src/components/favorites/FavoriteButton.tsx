"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	useFavorites,
	type FavoriteSnapshot,
} from "@/lib/favorites/useFavorites";
import { HeartFilledIcon, HeartOutlineIcon } from "@/components/icons/HeartIcons";

type Props = {
	petId: string;
	snapshot?: FavoriteSnapshot;
	className?: string;
};

export default function FavoriteButton({ petId, snapshot, className }: Props) {
	const router = useRouter();
	const pathname = usePathname();

	const { user, isFavorited, toggle } = useFavorites();
	const liked = isFavorited(petId);

	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const iconColor = liked ? "text-[color:var(--primary)]" : "text-[color:var(--accent)]";

	async function onClick(e: React.MouseEvent<HTMLButtonElement>) {
		// If your card becomes clickable later, this prevents the heart click
		// from triggering the card click.
		e.stopPropagation();

		setError(null);

		if (!user) {
			router.push(`/login?next=${encodeURIComponent(pathname)}`);
			return;
		}

		try {
			setBusy(true);
			await toggle(petId, snapshot);
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "Failed to update favorite.",
			);
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className={className}>
			<button
				type="button"
				onClick={onClick}
				disabled={busy}
				aria-pressed={liked}
				aria-label={liked ? "Remove from favorites" : "Add to favorites"}
				className={[
					"inline-flex h-10 w-10 items-center justify-center rounded-full",
					"border border-border bg-surface/90 backdrop-blur",
					"transition hover:bg-muted active:scale-95",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
					"disabled:opacity-60",
					iconColor,
				].join(" ")}
			>
				{liked ? (
					<HeartFilledIcon className="h-5 w-5" />
				) : (
					<HeartOutlineIcon className="h-5 w-5" />
				)}
			</button>

			{/* keep errors subtle; you can remove this once stable */}
			{error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
		</div>
	);
}
