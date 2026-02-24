import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { clientDb } from "@/lib/firebase/client";

export async function upsertUserProfile(params: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}) {
  const ref = doc(clientDb, "users", params.uid);

  await setDoc(
    ref,
    {
      email: params.email,
      displayName: params.displayName,
      photoURL: params.photoURL,
      updatedAt: serverTimestamp(),
      // only set createdAt if doc doesn't exist (Firestore can't do this automatically)
      // We'll set it always in v1; later we can do a read-first if you care.
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}
