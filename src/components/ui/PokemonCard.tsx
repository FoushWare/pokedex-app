import { Link } from 'react-router-dom';
import type { PokemonCardData } from '@/types/pokemon.types';

interface Props {
  pokemon: PokemonCardData;
}

export default function PokemonCard({ pokemon }: Props) {
  const number = `#${String(pokemon.id).padStart(3, '0')}`;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <div className="bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center gap-2 cursor-pointer">
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <span className="font-bold capitalize text-card-foreground">{pokemon.name}</span>
        <span className="text-sm text-muted-foreground">{number}</span>
      </div>
    </Link>
  );
}
