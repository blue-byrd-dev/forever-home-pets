import "server-only";
import type { Animal } from "@/lib/types/animals";
import type {
	RGSearchResponse,
	RGAnimal,
	RGAnimalAttributes,
} from "@/lib/types/rescuegroups";

/**
 * Minimal JSON:API included item type (only what we use)
 */
type RGIncludedItem = {
	type: string;
	id: string;
	attributes?: Record<string, unknown>;
};

/**
 * Minimal relationships shape (only what we use)
 */
type RGRelationshipData =
	| { id: string; type?: string }
	| Array<{ id: string; type?: string }>
	| null
	| undefined;

type RGRelationships = Record<
	string,
	{
		data?: RGRelationshipData;
	}
>;

type RGAnimalWithRels = RGAnimal & {
	relationships?: RGRelationships;
};

/**
 * Attributes we rely on in normalization.
 * (Extends RGAnimalAttributes but allows optional fields that may exist.)
 */
type RGAnimalAttrExt = RGAnimalAttributes & {
	breedPrimary?: string | null;
	breedString?: string | null;
	ageString?: string | null;
	ageGroup?: string | null;
	sex?: string | null;
	size?: string | null;
	sizeGroup?: string | null;
	pictureThumbnailUrl?: string | null;
	descriptionText?: string | null;
	descriptionHtml?: string | null;

	locationCity?: string | null;
	locationState?: string | null;

	organizationId?: string | null;
	orgID?: string | null;

	createdDate?: string | null;
	updatedDate?: string | null;

	orgAddress?: {
		city?: string | null;
		state?: string | null;
	} | null;
};

function asString(v: unknown): string | null {
	if (typeof v === "string") {
		const s = v.trim();
		return s.length ? s : null;
	}
	return null;
}

function pickFirstPhotoUrl(
	pictures?: RGAnimalAttributes["pictures"],
): string | null {
	if (!pictures || pictures.length === 0) return null;

	const first = pictures[0];

	return (
		asString(first.large?.url) ??
		asString(first.medium?.url) ??
		asString(first.small?.url) ??
		asString(first.original?.url) ??
		// some picture objects may also have a plain `url`
		("url" in first ? asString((first as { url?: unknown }).url) : null) ??
		null
	);
}

function getAttrString(
  item: RGIncludedItem | null,
  key: string
): string | null {
  if (!item?.attributes) return null;
  return asString(item.attributes[key]);
}

function getFirstRelId(
	item: RGAnimalWithRels,
	relName: string,
): string | null {
	const rel = item.relationships?.[relName]?.data;
	if (!rel) return null;

	if (Array.isArray(rel)) {
		return rel[0]?.id ? String(rel[0].id) : null;
	}

	return "id" in rel && rel.id ? String(rel.id) : null;
}

function findIncluded(
	included: unknown,
	type: string,
	id: string | null,
): RGIncludedItem | null {
	if (!id || !Array.isArray(included)) return null;

	for (const x of included) {
		if (!x || typeof x !== "object") continue;

		const obj = x as Partial<RGIncludedItem>;
		if (obj.type === type && String(obj.id) === String(id)) {
			// coerce to RGIncludedItem with the fields we use
			return obj as RGIncludedItem;
		}
	}

	return null;
}

export function normalizeAnimals(rgResponse: RGSearchResponse): Animal[] {
	const data = rgResponse.data;
	if (!Array.isArray(data)) return [];


	const included: unknown =
		"included" in rgResponse ? (rgResponse as { included?: unknown }).included : undefined;

	return data.map((baseItem: RGAnimal): Animal => {
		const item = baseItem as RGAnimalWithRels;
		const attr = (item.attributes ?? {}) as RGAnimalAttrExt;

		const speciesValue =
			typeof attr.species === "string"
				? attr.species
				: asString((attr.species as unknown as { singular?: unknown })?.singular) ??
				  "Unknown";

		// Locations often come via included relationship
		const locationId =
			getFirstRelId(item, "locations") ?? getFirstRelId(item, "location");
		const loc = findIncluded(included, "locations", locationId);

		const cityFromLoc = asString(loc?.attributes?.city);
		const stateFromLoc = asString(loc?.attributes?.state);

		// Org id may be an attribute or a relationship
		const orgId =
			asString(attr.organizationId) ??
			asString(attr.orgID) ??
			getFirstRelId(item, "orgs") ??
			getFirstRelId(item, "org");

    const orgRelId =
      getFirstRelId(item, "orgs") ?? getFirstRelId(item, "org");
    const org = findIncluded(included, "orgs", orgRelId);

    const cityFromOrg = asString(org?.attributes?.city);
    const stateFromOrg = asString(org?.attributes?.state);
		const shelterName = getAttrString(org, "name");
		const shelterPhone = getAttrString(org, "phone");
		const shelterEmail = getAttrString(org, "email");
		const shelterUrl = getAttrString(org, "url");

		return {
			id: item.id,
			name: asString(attr.name) ?? "Unknown",
			species: asString(speciesValue) ?? "Unknown",

			breed: asString(attr.breedPrimary) ?? asString(attr.breedString) ?? null,
			age: asString(attr.ageString) ?? asString(attr.ageGroup) ?? null,
			sex: asString(attr.sex),
			size: asString(attr.size) ?? asString(attr.sizeGroup) ?? null,

			primaryPhoto:
				pickFirstPhotoUrl(attr.pictures) ?? asString(attr.pictureThumbnailUrl),

			description:
				asString(attr.descriptionText) ?? asString(attr.descriptionHtml),

			city:
        asString(attr.locationCity) ??
        asString(attr.orgAddress?.city) ??
        cityFromLoc ??
        cityFromOrg,

      state:
        asString(attr.locationState) ??
        asString(attr.orgAddress?.state) ??
        stateFromLoc ??
        stateFromOrg,

			rescueId: orgId,
			shelterName,
			shelterPhone,
			shelterEmail,
			shelterUrl,

			createdAt: asString(attr.createdDate) ?? asString(attr.updatedDate),
		};
	});
}
