import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import LoginClient from "../../../components/auth/LoginClient";

export default async function LoginPage() {
	const session = await getSession();
	if (session) redirect("/account");
	return <LoginClient />;
}
