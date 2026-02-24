// src/components/ui/InfoCard.tsx
type InfoCardProps = {
	title: string;
	body: string;
	className?: string;
};

export default function InfoCard({
	title,
	body,
	className = "",
}: InfoCardProps) {
	return (
		<div
			className={[
				"rounded-2xl border border-zinc-200/60 bg-white/70 p-5",
				"dark:border-zinc-800/60 dark:bg-white/5",
				className,
			].join(" ")}
		>
			<div className="text-sm font-semibold text-(--text)">{title}</div>
			<div className="mt-1 text-sm leading-relaxed text-zinc-600">{body}</div>
		</div>
	);
}
