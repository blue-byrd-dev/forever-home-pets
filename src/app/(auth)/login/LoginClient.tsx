"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function establishSession(): Promise<void> {
    const user: User | null = auth.currentUser;
    if (!user) throw new Error("No authenticated user.");

    const idToken: string = await user.getIdToken();

    const res = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as {
        detail?: string;
      } | null;

      throw new Error(data?.detail ?? "Session creation failed.");
    }
  }

  async function handleGoogle(): Promise<void> {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      await establishSession();
      router.replace(next);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Google sign-in failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleEmail(signup: boolean): Promise<void> {
    try {
      setLoading(true);

      if (signup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      await establishSession();
      router.replace(next);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Email authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-semibold mb-6">Sign In</h1>

      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full border px-4 py-2 rounded mb-4"
      >
        Continue with Google
      </button>

      <div className="mb-4 text-center text-sm opacity-60">or</div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <button
        onClick={() => handleEmail(false)}
        disabled={loading}
        className="w-full bg-black text-white px-4 py-2 rounded mb-3"
      >
        Sign In
      </button>

      <button
        onClick={() => handleEmail(true)}
        disabled={loading}
        className="w-full border px-4 py-2 rounded"
      >
        Create Account
      </button>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
