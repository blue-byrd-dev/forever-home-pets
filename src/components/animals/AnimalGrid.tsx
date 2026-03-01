// src/components/animals/AnimalGrid.tsx
import type { Animal } from "@/lib/types/animals";
import AnimalCard from "@/components/animals/AnimalCard";

export default function AnimalGrid({ animals }: { animals: Animal[] }) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{animals.map((a) => (
				<AnimalCard key={a.id} animal={a} />
			))}
		</div>
	);
}
