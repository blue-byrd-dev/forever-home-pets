export type PetCard = {
  id: string;
  source: "rescuegroups" | "petfinder" | "internal";

  name: string;
  species: string;
  breed: string;
  age: string;
  sex: string;
  size: string;

  primaryPhoto?: string;
  city?: string;
  state?: string;

  organizationName?: string;
};

export type PetDetail = PetCard & {
  description?: string;
  photos?: string[];
  applyUrl?: string;
  organizationId?: string;
};
