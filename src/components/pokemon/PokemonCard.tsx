import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PokemonCardData } from '@/types/pokemon.types';

interface PokemonCardProps {
  pokemon: PokemonCardData;
}

const PokemonCard = memo(function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const number = `#${String(pokemon.id).padStart(3, '0')}`;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center gap-3">
        <div className="w-full aspect-[4/3] rounded-lg bg-gray-100 flex items-center justify-center relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className={`w-28 h-28 object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="text-center">
          <h3 className="font-bold capitalize text-gray-900">{pokemon.name}</h3>
          <span className="text-sm text-gray-500">{number}</span>
        </div>
      </div>
    </Link>
  );
});

PokemonCard.displayName = 'PokemonCard';

export default PokemonCard;
