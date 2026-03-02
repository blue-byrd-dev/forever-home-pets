import { requireSession } from "@/lib/auth/session";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function AccountPage() {
	const { uid } = await requireSession();

	return (
		<div className="p-6">
			<h1 className="text-xl font-semibold">Account</h1>
			<p className="mt-2 mb-4 text-sm opacity-80">UID: {uid}</p>
			<LogoutButton  />
		</div>
	);
}
