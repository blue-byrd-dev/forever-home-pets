"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();

	if (!theme) return null; 

	const current = theme;

	function cycleTheme() {
		const next =
			current === "system" ? "light" : current === "light" ? "dark" : "system";

		setTheme(next);
	}

	const isDark =
		current === "dark" || (current === "system" && resolvedTheme === "dark");

	return (
		<button
			onClick={cycleTheme}
			className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:opacity-80"
		>
			<span>{isDark ? "🌙" : "☀️"}</span>
			<span className="hidden sm:inline capitalize">{current}</span>
		</button>
	);
}
