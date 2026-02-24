import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const projectId = requireEnv("FIREBASE_PROJECT_ID");
const clientEmail = requireEnv("FIREBASE_CLIENT_EMAIL");
const privateKey = requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);

// Optional: set Firestore settings here if you need them later
// adminDb.settings({ ignoreUndefinedProperties: true });
