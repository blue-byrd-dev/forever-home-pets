// src/app/privacy/page.tsx
import Link from "next/link";
import Section from "@/components/ui/Section";

export const metadata = {
	title: "Privacy Policy — Forever Home",
	description: "Privacy policy for Forever Home.",
};

const LAST_UPDATED = "February 24, 2026";

export default function PrivacyPage() {
	return (
		<main className="min-h-screen bg-(--background) text-(--text)">
			<div className="mx-auto w-full max-w-3xl px-6 py-12">
				<Link
					href="/"
					className="text-sm font-medium text-zinc-600 hover:text-(--text)"
				>
					← Back
				</Link>

				<h1 className="mt-6 text-3xl font-semibold tracking-tight">
					Privacy Policy
				</h1>
				<p className="mt-2 text-sm text-zinc-500">
					Last updated: {LAST_UPDATED}
				</p>

				<div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-600">
					<Section title="Overview">
						Forever Home is an adoption-first platform currently in development.
						This Privacy Policy explains what information we collect, how we use
						it, and your choices.
					</Section>

					<Section title="Information we may collect">
						<ul className="list-disc space-y-2 pl-5">
							<li>
								<span className="font-medium text-(--text)">
									Contact details
								</span>{" "}
								(such as name and email) if you contact us or request updates.
							</li>
							<li>
								<span className="font-medium text-(--text)">
									Account data
								</span>{" "}
								if you create an account (e.g., email, profile info you choose
								to provide).
							</li>
							<li>
								<span className="font-medium text-(--text)">
									Usage data
								</span>{" "}
								(like pages viewed and basic device/browser info) to improve
								reliability and security.
							</li>
						</ul>
					</Section>

					<Section title="How we use information">
						<ul className="list-disc space-y-2 pl-5">
							<li>Provide and operate the service.</li>
							<li>Respond to messages and support requests.</li>
							<li>Improve features, performance, and user experience.</li>
							<li>Maintain security and prevent abuse.</li>
						</ul>
					</Section>

					<Section title="Cookies and analytics">
						We may use cookies or similar technologies for essential site
						functionality and basic analytics. As the product evolves, we may
						add or change analytics tools and will update this policy
						accordingly.
					</Section>

					<Section title="Sharing of information">
						We do not sell your personal information. We may share information
						with service providers that help run the site (hosting, email
						delivery, etc.), or when required to comply with law or protect
						safety.
					</Section>

					<Section title="Data retention">
						We keep information only as long as needed to provide the service,
						comply with legal obligations, resolve disputes, and enforce
						agreements.
					</Section>

					<Section title="Your choices">
						You can request access, correction, or deletion of your personal
						information by contacting us.
					</Section>

					<Section title="Children’s privacy">
						Forever Home is not intended for children under 13. If you believe a
						child has provided personal information, contact us so we can remove
						it.
					</Section>

					<Section title="Contact">
						Email:{" "}
						<a
							className="font-medium underline underline-offset-4 hover:opacity-80"
							style={{ color: "var(--primary)" }}
							href="mailto:k.byrd@bluebyrddevelopment.com?subject=Privacy%20Request"
						>
							k.byrd@bluebyrddevelopment.com
						</a>
					</Section>
				</div>

				<div className="mt-10 flex gap-4 text-sm text-zinc-500">
					<Link className="hover:text-zinc-700" href="/terms">
						Terms
					</Link>
					<Link className="hover:text-zinc-700" href="/status">
						Status
					</Link>
				</div>
			</div>
		</main>
	);
}
