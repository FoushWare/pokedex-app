import type { PokemonStat } from '@/types/pokemon.types';
import StatBar from '@/components/ui/StatBar';

interface StatsSectionProps {
  stats: PokemonStat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3">Base Stats</h2>
      <div className="space-y-2">
        {stats.map((s) => (
          <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
        ))}
      </div>
    </div>
  );
}
