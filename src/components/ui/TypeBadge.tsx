const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-indigo-700',
  dragon: 'bg-violet-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

interface Props {
  type: string;
}

export default function TypeBadge({ type }: Props) {
  const bg = TYPE_COLORS[type] || 'bg-gray-400';
  return (
    <span className={`${bg} text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full capitalize`}>
      {type}
    </span>
  );
}
