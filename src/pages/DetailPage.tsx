import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import PageLayout from '@/components/layout/PageLayout';
import DetailHeader from '@/components/detail/DetailHeader';
import PokemonImage from '@/components/detail/PokemonImage';
import StatsSection from '@/components/detail/StatsSection';
import AbilitiesSection from '@/components/detail/AbilitiesSection';
import PhysicalInfo from '@/components/detail/PhysicalInfo';
import TypeBadge from '@/components/ui/TypeBadge';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon } = usePokemonDetail(id!);

  const number = `#${String(pokemon.id).padStart(3, '0')}`;
  const sprite = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <PageLayout mode="detail">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-all mb-8 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to List
      </Link>

      <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <DetailHeader name={pokemon.name} number={number} />

        <div className="bg-white p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Left Column: Visuals & Tags */}
            <div className="flex flex-col items-center gap-6 md:w-2/5">
              <PokemonImage src={sprite} alt={pokemon.name} />
              
              <div className="flex gap-2.5">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>

              <PhysicalInfo height={pokemon.height} weight={pokemon.weight} />
            </div>

            {/* Right Column: Detailed Stats */}
            <div className="flex-1 space-y-8">
              <StatsSection stats={pokemon.stats} />
              <AbilitiesSection abilities={pokemon.abilities} />

              <div className="border-t border-gray-100 pt-6">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Base Experience
                </h2>
                <p className="text-3xl font-black text-pink-600 tracking-tighter">
                  {pokemon.base_experience} XP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
