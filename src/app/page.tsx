export default function Home() {
	return (
		<main className="min-h-screen grid place-items-center p-8">
			<div className="max-w-lg w-full rounded-2xl border p-6 shadow-sm">
				<h1 className="text-3xl font-bold">Forever Home</h1>
				<p className="mt-2 text-sm opacity-80">
					Next.js + TypeScript + Tailwind v4 is alive.
				</p>

				<button className="mt-6 inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:opacity-80">
					Let’s build 🐾
				</button>
			</div>
		</main>
	);
}
