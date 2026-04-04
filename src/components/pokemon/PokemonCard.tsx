import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { PokemonCardData } from '@/types/pokemon.types';

interface PokemonCardProps {
  pokemon: PokemonCardData;
}

const PokemonCard = memo(function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const number = `#${String(pokemon.id).padStart(3, '0')}`;

  // Reset/Check loading state when pokemon changes
  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
  }, [pokemon.id]);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center gap-3">
        <div className="w-full aspect-[4/3] rounded-lg bg-gray-50 flex items-center justify-center relative overflow-hidden ring-1 ring-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-shimmer" />
          )}
          <img
            ref={imgRef}
            src={pokemon.sprite}
            alt={pokemon.name}
            className={`w-28 h-28 object-contain transition-all duration-300 ease-out ${
              imageLoaded 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-90'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="text-center">
          <h3 className="font-black capitalize text-gray-900 group-hover:text-black transition-colors">{pokemon.name}</h3>
          <span className="text-sm font-mono text-gray-400 group-hover:text-gray-600 transition-colors">{number}</span>
        </div>
      </div>
    </Link>
  );
});

PokemonCard.displayName = 'PokemonCard';

export default PokemonCard;
