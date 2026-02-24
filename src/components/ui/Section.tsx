// src/components/ui/Section.tsx
import { ReactNode } from "react";

type SectionProps = {
	title?: string;
	children: ReactNode;
	className?: string;
};

export default function Section({
	title,
	children,
	className = "",
}: SectionProps) {
	return (
		<section
			className={[
				"rounded-3xl border border-zinc-200/60 bg-white/20 p-6",
				"dark:border-zinc-800/60 dark:bg-white/60",
				className,
			].join(" ")}
		>
			{title && (
				<h2 className="text-lg font-semibold text-(--primary)">{title}</h2>
			)}

			<div
				className={title ? "mt-3 text-sm leading-relaxed text-zinc-300" : ""}
			>
				{children}
			</div>
		</section>
	);
}
