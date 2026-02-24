// src/app/api/health/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

export async function GET() {
  // Minimal Firestore call to prove Admin initializes
  const snap = await adminDb.collection("_health").limit(1).get();

  return NextResponse.json({
    ok: true,
    firestore: "connected",
    count: snap.size,
  });
}
