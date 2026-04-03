import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import StatBar from '@/components/ui/StatBar';
import TypeBadge from '@/components/ui/TypeBadge';
import { Ruler, Weight } from 'lucide-react';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon } = usePokemonDetail(id!);

  const number = `#${String(pokemon.id).padStart(3, '0')}`;
  const sprite = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div className="min-h-screen bg-[#FDFCFE] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-all mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to List
        </Link>

        {/* Header banner */}
        <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-t-3xl p-8 text-center shadow-xl">
          <h1 className="text-3xl md:text-4xl font-black text-white capitalize tracking-tight drop-shadow-sm">⚡ {pokemon.name}</h1>
          <p className="text-white/90 font-mono mt-1 text-lg">{number}</p>
        </div>

        {/* Content card */}
        <div className="bg-card rounded-b-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left */}
            <div className="flex flex-col items-center gap-4 md:w-2/5">
              <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center">
                <img src={sprite} alt={pokemon.name} className="w-40 h-40 object-contain" />
              </div>
              <div className="flex gap-2">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>
              <div className="flex gap-6 text-sm text-card-foreground">
                <div className="flex items-center gap-1">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold">{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="flex items-center gap-1">
                  <Weight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold">{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-card-foreground mb-3">Base Stats</h2>
                <div className="space-y-2">
                  {pokemon.stats.map((s) => (
                    <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-card-foreground mb-2">Abilities</h2>
                <ul className="space-y-1">
                  {pokemon.abilities.map((a) => (
                    <li key={a.ability.name} className="capitalize text-card-foreground">
                      {a.ability.name.replace('-', ' ')}
                      {a.is_hidden && <span className="text-muted-foreground text-xs ml-2">(hidden)</span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-card-foreground mb-1">Base Experience</h2>
                <p className="text-xl font-bold text-xp-pink">{pokemon.base_experience} XP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
