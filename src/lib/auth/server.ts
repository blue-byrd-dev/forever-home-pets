import "server-only";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin"; // adjust to your admin export

export async function getServerUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value; // OR whatever you named it

  if (!session) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    return decoded; // contains uid, etc.
  } catch {
    return null;
  }
}
