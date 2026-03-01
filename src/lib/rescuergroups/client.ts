import "server-only";
import type { RGSearchResponse } from "@/lib/types/rescuegroups";

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) throw new Error(`Missing env var: ${name}`);
	return value;
}

const API_KEY = requireEnv("RESCUEGROUPS_API_KEY");

// IMPORTANT: viewName is required by the docs
const VIEW_NAME = "available";
const BASE_URL = `https://api.rescuegroups.org/v5/public/animals/search/${VIEW_NAME}/`;

function buildRgQueryString() {
	const qs = new URLSearchParams();

	qs.set("include", "locations,orgs,pictures");

	qs.set(
		"fields[animals]",
		[
			"name",
			"species",
			"breedPrimary",
			"breedString",
			"ageGroup",
			"ageString",
			"sex",
			"size",
			"pictures",
			"pictureThumbnailUrl",
			"organizationId",
			"createdDate",
			"updatedDate",
			"locationCity",
			"locationState",
		].join(","),
	);

	// Keep these ON once you're done experimenting
	qs.set("fields[locations]", ["city", "state"].join(","));
	qs.set("fields[orgs]", ["name", "city", "state", "phone","email", "url"].join(","));

	return qs.toString();
}


function isRGSearchResponse(v: unknown): v is RGSearchResponse {
	return (
		typeof v === "object" &&
		v !== null &&
		"data" in v &&
		Array.isArray((v as { data?: unknown }).data)
	);
}

export async function fetchAnimalsFromRescueGroups(params: {
	location?: string;
	species?: string;
	limit?: number;
}): Promise<RGSearchResponse> {
	const url = `${BASE_URL}?${buildRgQueryString()}`;

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

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/vnd.api+json",
			Authorization: API_KEY,
		},
		body: JSON.stringify(body),
		cache: "no-store",
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`RescueGroups error: ${res.status} ${text}`);
	}

	const json: unknown = await res.json();

if (!isRGSearchResponse(json)) {
	throw new Error("RescueGroups returned an unexpected response shape.");
}

return json;

	// // Optional sanity check (recommended)
	// if (typeof json !== "object" || json === null || !("data" in json)) {
	// 	throw new Error("RescueGroups returned an unexpected response shape.");
	// }

	return json as RGSearchResponse;
}
