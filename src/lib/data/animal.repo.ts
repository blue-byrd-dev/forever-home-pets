import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import type { Animal } from "@/lib/types/animals";
import type { Timestamp } from "firebase-admin/firestore";

export type AnimalsCacheDoc = {
  key: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  params: {
    postal: string | null;
    species: string | null;
    limit: number;
  };
  animals: Animal[];
};

const COLLECTION = "animals_cache";

export async function getAnimalsCache(key: string): Promise<AnimalsCacheDoc | null> {
  const snap = await adminDb.collection(COLLECTION).doc(key).get();
  if (!snap.exists) return null;

  const data = snap.data() as AnimalsCacheDoc;

  // Still keep this check (TTL deletions are not instant)
  if (data.expiresAt.toMillis() <= Date.now()) return null;

  return data;
}

export async function setAnimalsCache(doc: AnimalsCacheDoc): Promise<void> {
  await adminDb.collection(COLLECTION).doc(doc.key).set(doc, { merge: true });
}
