"use client";

import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { auth } from "./client";

let authReady: Promise<User>;

export function ensureUser(): Promise<User> {
  if (!authReady) {
    authReady = new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          unsubscribe();
          resolve(user);
        } else {
          try {
            const result = await signInAnonymously(auth);
            unsubscribe();
            resolve(result.user);
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  }

  return authReady;
}
