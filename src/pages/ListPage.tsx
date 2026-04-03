import { useState, Suspense } from 'react';
import { usePokemonList } from '@/hooks/usePokemonList';
import { usePokemonLoadMore } from '@/hooks/usePokemonLoadMore';
import { POKEMON_PER_PAGE } from '@/config/constants';
import PageLayout from '@/components/layout/PageLayout';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import PokemonPagination from '@/components/pokemon/PokemonPagination';
import LoadMoreButton from '@/components/pokemon/LoadMoreButton';
import ModeToggle, { ViewMode } from '@/components/ui/ModeToggle';
import SkeletonGrid from '@/components/skeletons/SkeletonGrid';

function PaginatedView() {
  const [page, setPage] = useState(1);
  const { data } = usePokemonList(page);
  const totalPages = Math.ceil(data.total / POKEMON_PER_PAGE);

  return (
    <>
      <PokemonGrid pokemon={data.pokemon} />
      <PokemonPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <p className="text-center text-sm text-gray-500 mt-4 font-medium opacity-70">
        Page {page} of {totalPages}
      </p>
    </>
  );
}

function LoadMoreView() {
  const { pokemon, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonLoadMore();

  return (
    <>
      <PokemonGrid pokemon={pokemon} />
      <LoadMoreButton 
        onClick={() => fetchNextPage()} 
        isLoading={isFetchingNextPage} 
        hasMore={hasNextPage} 
      />
      <p className="text-center text-sm text-gray-500 mt-2 font-medium opacity-70">
        Showing {pokemon.length} Pokémon
      </p>
    </>
  );
}

export default function ListPage() {
  const [mode, setMode] = useState<ViewMode>('paginated');

  return (
    <PageLayout mode={mode}>
      <header className="mb-10">
        <h1 className="text-3xl font-black text-center text-gray-900 mb-2 tracking-tight">
          ⚡ Pokédex
        </h1>
        <p className="text-center text-gray-500 font-medium mb-8">
          Discover and explore Pokémon with {mode === 'paginated' ? 'page controls' : 'infinite scroll'}
        </p>
        <ModeToggle mode={mode} onModeChange={setMode} />
      </header>

      <Suspense key={mode} fallback={<SkeletonGrid />}>
        {mode === 'paginated' ? <PaginatedView /> : <LoadMoreView />}
      </Suspense>
    </PageLayout>
  );
}
