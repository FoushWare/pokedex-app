import { memo, useMemo } from 'react';

interface Props {
  label: string;
  value: number;
  max?: number;
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Spd',
};

const StatBar = memo(function StatBar({ label, value, max = 255 }: Props) {
  const pct = Math.min((value / max) * 100, 100);
  const displayLabel = STAT_LABELS[label] || label;

  const barColor = useMemo(() => {
    if (pct < 20) return 'bg-red-500';
    if (pct < 50) return 'bg-yellow-500';
    return 'bg-emerald-500';
  }, [pct]);

  return (
    <div className="flex items-center gap-3 text-xs md:text-sm group">
      <span className="w-16 md:w-20 text-right font-bold text-muted-foreground uppercase tracking-tight truncate">
        {displayLabel}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 text-right font-mono font-bold text-foreground tabular-nums tracking-tighter">
        {String(value).padStart(3, '0')}
      </span>
    </div>
  );
});

StatBar.displayName = 'StatBar';

export default StatBar;
