// src/app/terms/page.tsx
import Link from "next/link";
import Section from "@/components/ui/Section";

export const metadata = {
	title: "Terms of Service — Forever Home",
	description: "Terms of service for Forever Home.",
};

const LAST_UPDATED = "February 24, 2026";

export default function TermsPage() {
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
					Terms of Service
				</h1>
				<p className="mt-2 text-sm text-zinc-500">
					Last updated: {LAST_UPDATED}
				</p>

				<div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-600">
					<Section title="Overview">
						These Terms govern your access to and use of Forever Home (the
						“Service”). By using the Service, you agree to these Terms.
					</Section>

					<Section title="About the Service">
						Forever Home is an adoption-first platform currently in development.
						We aim to help people discover adoptable pets and connect with
						verified shelters/rescues. We do not list pets for private sale and
						do not promote breeders or mills.
					</Section>

					<Section title="Eligibility and accounts">
						If you create an account, you are responsible for maintaining the
						confidentiality of your account and for all activity that occurs
						under it.
					</Section>

					<Section title="Acceptable use">
						You agree not to:
						<ul className="mt-3 list-disc space-y-2 pl-5">
							<li>
								Use the Service for unlawful, harmful, or fraudulent purposes.
							</li>
							<li>
								Attempt to interfere with the Service’s operation or security.
							</li>
							<li>
								Scrape, crawl, or harvest data at scale without written
								permission.
							</li>
							<li>
								Misrepresent affiliation with rescues, shelters, or partners.
							</li>
						</ul>
					</Section>

					<Section title="Data sources and accuracy">
						Pet listings and rescue information may be provided by third-party
						data partners. We do our best to present accurate information, but
						we cannot guarantee completeness or real-time availability of every
						listing.
					</Section>

					<Section title="Third-party links and services">
						The Service may link to third-party websites (including rescue
						organizations). We are not responsible for third-party content,
						policies, or practices.
					</Section>

					<Section title="Disclaimers">
						The Service is provided “as is” and “as available.” We disclaim
						warranties to the fullest extent permitted by law.
					</Section>

					<Section title="Limitation of liability">
						To the fullest extent permitted by law, Forever Home will not be
						liable for indirect, incidental, special, consequential, or punitive
						damages, or any loss of data or profits.
					</Section>

					<Section title="Changes to the Service or Terms">
						We may modify the Service and these Terms as the platform evolves.
						We will update the “Last updated” date and, if changes are material,
						provide reasonable notice.
					</Section>

					<Section title="Contact">
						Email:{" "}
						<a
							className="font-medium underline underline-offset-4 hover:opacity-80"
							style={{ color: "var(--accent)" }}
							href="mailto:k.byrd@bluebyrddevelopment.com?subject=Terms%20Question"
						>
							k.byrd@bluebyrddevelopment.com
						</a>
					</Section>
				</div>

				<div className="mt-10 flex gap-4 text-sm text-zinc-500">
					<Link className="hover:text-zinc-700" href="/privacy">
						Privacy
					</Link>
					<Link className="hover:text-zinc-700" href="/status">
						Status
					</Link>
				</div>
			</div>
		</main>
	);
}
