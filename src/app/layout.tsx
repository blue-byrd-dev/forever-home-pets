import "./globals.css";

import type { Metadata, Viewport } from "next";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
	metadataBase: new URL("https://foreverhome-pets.com"),

	title: {
		default: "Forever Home",
		template: "%s | Forever Home",
	},

	description:
		"Connecting future pet parents with ethical rescues and shelters.",

	openGraph: {
		type: "website",
		url: "https://foreverhome-pets.com",
		siteName: "Forever Home",
		title: "Forever Home",
		description:
			"Connecting future pet parents with ethical rescues and shelters.",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Forever Home",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "Forever Home",
		description:
			"Connecting future pet parents with ethical rescues and shelters.",
		images: ["/og.png"],
	},

	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},

	manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#e46b48" },
		{ media: "(prefers-color-scheme: dark)", color: "#ff8a63" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider>
					<AuthProvider>{children}</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
