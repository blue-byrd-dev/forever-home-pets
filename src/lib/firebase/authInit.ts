"use client";

import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { clientAuth } from "./client";

let authReady: Promise<User>;

export function ensureUser(): Promise<User> {
  if (!authReady) {
    authReady = new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(clientAuth, async (user) => {
        if (user) {
          unsubscribe();
          resolve(user);
        } else {
          try {
            const result = await signInAnonymously(clientAuth);
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
