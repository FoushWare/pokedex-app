import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { PokemonCardData } from '@/types/pokemon.types';

interface Props {
  pokemon: PokemonCardData;
}

const PokemonCard = memo(function PokemonCard({ pokemon }: Props) {
  const number = `#${String(pokemon.id).padStart(3, '0')}`;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block transition-transform hover:-translate-y-1 active:scale-95">
      <div className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col items-center gap-3 border border-transparent hover:border-primary/20">
        <div className="w-32 h-32 flex items-center justify-center bg-muted/30 rounded-full p-2 group-hover:bg-muted/50 transition-colors">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg capitalize text-card-foreground line-clamp-1">{pokemon.name}</h3>
          <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{number}</span>
        </div>
      </div>
    </Link>
  );
});

PokemonCard.displayName = 'PokemonCard';

export default PokemonCard;
