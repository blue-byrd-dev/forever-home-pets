export type Animal = {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  age: string | null;
  sex: string | null;
  size: string | null;
  primaryPhoto: string | null;
  description: string | null;
  city: string | null;
  state: string | null;
  rescueId: string | null;
  createdAt: string | null;

  shelterName: string | null;
  shelterPhone: string | null;
  shelterEmail: string | null;
  shelterUrl: string | null;
};

export type AnimalsApiResponse =
  | { ok: true; count: number; animals: Animal[]; meta: { postal: string | null; species: string | null; limit: number } }
  | { ok: false; error: string };
