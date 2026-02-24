import "server-only";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

const API_KEY = requireEnv("RESCUEGROUPS_API_KEY");

if (!API_KEY) {
  throw new Error("Missing RESCUEGROUPS_API_KEY");
}

const BASE_URL = "https://api.rescuegroups.org/v5/public/animals/search";

export async function fetchAnimalsFromRescueGroups(params: {
  location?: string;
  species?: string;
  limit?: number;
}) {
  const body = {
    data: {
      filters: [
        params.species
          ? {
              fieldName: "species.singular",
              operation: "equals",
              criteria: params.species,
            }
          : undefined,
      ].filter(Boolean),
      filterRadius: {
        miles: 50,
        postalcode: params.location ?? "75201",
      },
      sort: [
        {
          fieldName: "animals.createdDate",
          direction: "desc",
        },
      ],
      limit: params.limit ?? 20,
    },
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: API_KEY,
    },
    body: JSON.stringify(body),
    cache: "no-store", // prevent Next from caching automatically
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`RescueGroups error: ${res.status} ${text}`);
  }

  return res.json();
}
