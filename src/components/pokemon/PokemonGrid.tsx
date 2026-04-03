import type { PokemonCardData } from '@/types/pokemon.types';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemon: PokemonCardData[];
}

export default function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
