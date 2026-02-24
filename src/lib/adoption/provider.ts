import type { PetCard, PetDetail } from "./types";

export type SearchParams = {
  location?: string;
  species?: string;
  page?: number;
  limit?: number;
};

export interface AdoptionProvider {
  searchPets(params: SearchParams): Promise<{
    pets: PetCard[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  getPetById(id: string): Promise<PetDetail | null>;
}
