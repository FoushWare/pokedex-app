interface Props {
  label: string;
  value: number;
  max?: number;
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

export default function StatBar({ label, value, max = 255 }: Props) {
  const pct = Math.min((value / max) * 100, 100);
  const displayLabel = STAT_LABELS[label] || label;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-24 text-right font-medium text-card-foreground">{displayLabel}</span>
      <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-stat-bar transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right font-semibold text-card-foreground">{value}</span>
    </div>
  );
}
