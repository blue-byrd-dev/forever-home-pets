// src/components/ui/StatusRow.tsx
type StatusRowProps = {
	label: string;
	value: string;
	className?: string;
};

export default function StatusRow({
	label,
	value,
	className = "",
}: StatusRowProps) {
	return (
		<div
			className={[
				"flex items-center justify-between rounded-2xl px-4 py-3",
				"border border-zinc-200/60 bg-white/60",
				"dark:border-zinc-800/60 dark:bg-white/5",
				className,
			].join(" ")}
		>
			<div className="text-sm text-zinc-600">{label}</div>
			<div className="text-xs font-semibold text-(--text)">{value}</div>
		</div>
	);
}
