import "server-only";
import type { Animal } from "@/lib/types/animals";
import type { RGSearchResponse, RGAnimal, RGAnimalAttributes } from "@/lib/types/rescuegroups";

/**
 * RescueGroups v5 public API returns JSON:API-ish structures.
 * We normalize it into our app's stable Animal shape so UI never depends on RG fields.
 */

function asString(v: unknown): string | null {
  if (typeof v === "string") {
    const s = v.trim();
    return s.length ? s : null;
  }
  return null;
}

function pickFirstPhotoUrl(pictures?: RGAnimalAttributes["pictures"]): string | null {
  if (!pictures || pictures.length === 0) return null;

  const first = pictures[0];

  return (
    asString(first.large?.url) ??
    asString(first.medium?.url) ??
    asString(first.small?.url) ??
    asString(first.original?.url) ??
    asString(first.url) ??
    null
  );
}

export function normalizeAnimals(
  rgResponse: RGSearchResponse
): Animal[] {
  const data = rgResponse.data;
  if (!Array.isArray(data)) return [];

  return data.map((item: RGAnimal): Animal => {
    const attr = item.attributes ?? {};

    const species =
      typeof attr.species === "string"
        ? attr.species
        : attr.species?.singular ?? "Unknown";

    return {
      id: item.id,
      name: asString(attr.name) ?? "Unknown",
      species: asString(species) ?? "Unknown",
      breed:
        asString(attr.breedPrimary) ??
        asString(attr.breedString) ??
        null,
      age:
        asString(attr.ageString) ??
        asString(attr.ageGroup) ??
        null,
      sex: asString(attr.sex),
      size: asString(attr.size),
      primaryPhoto:
        pickFirstPhotoUrl(attr.pictures) ??
        asString(attr.pictureThumbnailUrl),
      description:
        asString(attr.descriptionText) ??
        asString(attr.descriptionHtml),
      city:
        asString(attr.locationCity) ??
        asString(attr.orgAddress?.city),
      state:
        asString(attr.locationState) ??
        asString(attr.orgAddress?.state),
      rescueId:
        asString(attr.organizationId) ??
        asString(attr.orgID),
      createdAt:
        asString(attr.createdDate) ??
        asString(attr.updatedDate),
    };
  });
}
