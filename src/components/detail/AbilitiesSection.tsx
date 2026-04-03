import type { PokemonAbility } from '@/types/pokemon.types';

interface AbilitiesSectionProps {
  abilities: PokemonAbility[];
}

export default function AbilitiesSection({ abilities }: AbilitiesSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-2">Abilities</h2>
      <ul className="space-y-1">
        {abilities.map((a) => (
          <li key={a.ability.name} className="capitalize text-gray-700">
            {a.ability.name.replace('-', ' ')}
            {a.is_hidden && <span className="text-gray-400 text-xs ml-2">(hidden)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
