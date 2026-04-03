import { memo } from 'react';

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-zinc-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-600',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-600',
  rock: 'bg-stone-600',
  ghost: 'bg-indigo-700',
  dragon: 'bg-violet-700',
  dark: 'bg-zinc-800',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
};

interface Props {
  type: string;
}

const TypeBadge = memo(function TypeBadge({ type }: Props) {
  const bg = TYPE_COLORS[type.toLowerCase()] || 'bg-zinc-400';
  return (
    <span className={`${bg} text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md shadow-sm`}>
      {type}
    </span>
  );
});

TypeBadge.displayName = 'TypeBadge';

export default TypeBadge;
