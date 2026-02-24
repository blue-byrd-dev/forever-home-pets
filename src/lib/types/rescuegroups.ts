export type RGAnimalAttributes = {
  name?: string;
  species?: {
    singular?: string;
  } | string;
  breedPrimary?: string;
  breedString?: string;
  ageString?: string;
  ageGroup?: string;
  sex?: string;
  size?: string;
  pictures?: Array<{
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
    original?: { url?: string };
    url?: string;
  }>;
  pictureThumbnailUrl?: string;
  descriptionText?: string;
  descriptionHtml?: string;
  locationCity?: string;
  locationState?: string;
  orgAddress?: {
    city?: string;
    state?: string;
  };
  organizationId?: string;
  orgID?: string;
  createdDate?: string;
  updatedDate?: string;
};

export type RGAnimal = {
  id: string;
  attributes?: RGAnimalAttributes;
};

export type RGSearchResponse = {
  data?: RGAnimal[];
};
