import "server-only";
import type { Animal } from "@/lib/types/animals";
import { fetchAnimalsFromRescueGroups } from "@/lib/rescuergroups/client";
import { normalizeAnimals } from "@/lib/rescuergroups/normalize";
import { getAnimalsCache, setAnimalsCache } from "@/lib/data/animal.repo";
import { Timestamp } from "firebase-admin/firestore";

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 60;

const CACHE_ENABLED = (process.env.ANIMALS_CACHE_ENABLED ?? "true") === "true";
const CACHE_TTL_SECONDS =
  Number.parseInt(process.env.ANIMALS_CACHE_TTL_SECONDS ?? "600", 10) || 600;

export type AnimalsQuery = {
  postal?: string;
  species?: string;
  limit?: number;
  fresh?: boolean; // bypass cache when true (optional but very handy)
};

export type AnimalsResult = {
  animals: Animal[];
  source: "cache" | "live";
  meta: {
    postal: string | null;
    species: string | null;
    limit: number;
    cacheKey: string;
    cacheEnabled: boolean;
    ttlSeconds: number;
    fresh: boolean;
  };
};

function normalizeLimit(limit?: number): number {
  const n = typeof limit === "number" ? limit : DEFAULT_LIMIT;
  if (!Number.isFinite(n)) return DEFAULT_LIMIT;
  return Math.min(Math.max(Math.trunc(n), 1), MAX_LIMIT);
}

function cleanString(v?: string): string | null {
  const s = (v ?? "").trim();
  return s.length ? s : null;
}

function buildCacheKey(params: {
  postal: string | null;
  species: string | null;
  limit: number;
}): string {
  const postal = params.postal ?? "none";
  const species = (params.species ?? "any").toLowerCase();
  return `postal:${postal}|species:${species}|limit:${params.limit}`;
}

export async function getAnimals(query: AnimalsQuery): Promise<AnimalsResult> {
  const postal = cleanString(query.postal);
  const species = cleanString(query.species);
  const limit = normalizeLimit(query.limit);
  const fresh = query.fresh === true;

  const cacheKey = buildCacheKey({ postal, species, limit });

  console.log("[getAnimals] start", { postal, species, limit, fresh, cacheKey });

  // 1) Cache read
  if (CACHE_ENABLED && !fresh) {
    const cached = await getAnimalsCache(cacheKey);
    if (cached) {
      console.log("[getAnimals] cache hit", { cacheKey, count: cached.animals.length });
      return {
        animals: cached.animals,
        source: "cache",
        meta: {
          postal,
          species,
          limit,
          cacheKey,
          cacheEnabled: true,
          ttlSeconds: CACHE_TTL_SECONDS,
          fresh,
        },
      };
    }
    console.log("[getAnimals] cache miss", { cacheKey });
  } else {
    console.log("[getAnimals] cache bypassed", { CACHE_ENABLED, fresh });
  }

  // 2) Live fetch → normalize
  console.log("[getAnimals] calling RescueGroups…");
  const rgResponse = await fetchAnimalsFromRescueGroups({
    location: postal ?? undefined,
    species: species ?? undefined,
    limit,
  });
  console.log("[getAnimals] RescueGroups response received");

  const animals = normalizeAnimals(rgResponse);
  console.log("[getAnimals] normalized animals", { count: animals.length });

  // 3) Cache write (best-effort)
  if (CACHE_ENABLED) {
    const createdAt = Timestamp.now();
    const expiresAt = Timestamp.fromMillis(Date.now() + CACHE_TTL_SECONDS * 1000);

    await setAnimalsCache({
      key: cacheKey,
      createdAt,
      expiresAt,
      params: { postal, species, limit },
      animals,
    });

    console.log("[getAnimals] cache write complete", { cacheKey });
  }

  return {
    animals,
    source: "live",
    meta: {
      postal,
      species,
      limit,
      cacheKey,
      cacheEnabled: CACHE_ENABLED,
      ttlSeconds: CACHE_TTL_SECONDS,
      fresh,
    },
  };
}
