import type { AdoptionProvider } from "./provider";
import type { PetCard, PetDetail } from "./types";

const mockPets: PetDetail[] = [
  {
    id: "1",
    source: "internal",
    name: "Bella",
    species: "Dog",
    breed: "Labrador Mix",
    age: "Young",
    sex: "Female",
    size: "Medium",
    primaryPhoto: "https://placedog.net/500/400",
    city: "Dallas",
    state: "TX",
    description: "Sweet and playful. Loves kids.",
    photos: ["https://placedog.net/500/400"],
    applyUrl: "#",
    organizationName: "Happy Tails Rescue",
  },
  {
    id: "2",
    source: "internal",
    name: "Milo",
    species: "Cat",
    breed: "Domestic Shorthair",
    age: "Adult",
    sex: "Male",
    size: "Small",
    primaryPhoto: "https://placekitten.com/500/400",
    city: "Austin",
    state: "TX",
    description: "Calm and affectionate.",
    photos: ["https://placekitten.com/500/400"],
    applyUrl: "#",
    organizationName: "Safe Haven Cats",
  },
];

export const mockProvider: AdoptionProvider = {
  async searchPets() {
    return {
      pets: mockPets,
      total: mockPets.length,
      page: 1,
      totalPages: 1,
    };
  },

  async getPetById(id: string) {
    return mockPets.find((p) => p.id === id) ?? null;
  },
};
