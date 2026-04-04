import { useState, Suspense, useCallback, useRef, useEffect } from 'react';
import { useSuspenseInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { usePokemonList } from '@/hooks/usePokemonList';
import { fetchPokemonPage } from '@/api/pokemon';
import { pokemonKeys } from '@/api/queryKeys';
import { POKEMON_PER_PAGE } from '@/config/constants';
import PageLayout from '@/components/layout/PageLayout';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import PokemonPagination from '@/components/pokemon/PokemonPagination';
import ModeToggle, { ViewMode } from '@/components/ui/ModeToggle';
import SkeletonGrid from '@/components/skeletons/SkeletonGrid';
import PokemonCard from '@/components/pokemon/PokemonCard';

function PaginatedView() {
  const [page, setPage] = useState(1);
  const { data } = usePokemonList(page);
  const totalPages = Math.ceil(data.total / POKEMON_PER_PAGE);

  return (
    <>
      <PokemonGrid pokemon={data.pokemon} />
      <PokemonPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <p className="text-center text-sm text-gray-500 mt-4 font-medium opacity-70">
        Page {page} of {totalPages} <span className="opacity-70">({POKEMON_PER_PAGE} Pokémon per page)</span>
      </p>
    </>
  );
}

function InfiniteView() {
  const queryClient = useQueryClient();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: [...pokemonKeys.lists(), 'infinite'],
    queryFn: async ({ pageParam }) => {
      const data = await fetchPokemonPage(pageParam);
      // Prime the cache for each pokemon detail
      data.details.forEach((detail) => {
        queryClient.setQueryData(pokemonKeys.detail(detail.id), detail);
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const fetched = lastPageParam * POKEMON_PER_PAGE;
      return fetched < lastPage.total ? lastPageParam + 1 : undefined;
    },
  });

  const allPokemon = data.pages.flatMap((p) => p.pokemon);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      <div ref={sentinelRef} className="h-10" />
      {isFetchingNextPage && (
        <p className="text-center text-muted-foreground mt-4 animate-pulse">Loading more Pokémon...</p>
      )}
      <p className="text-center text-sm text-gray-500 mt-2 font-medium opacity-70">
        Showing {allPokemon.length} Pokémon
      </p>
    </>
  );
}

export default function ListPage() {
  const [mode, setMode] = useState<ViewMode>('paginated');

  return (
    <PageLayout mode={mode === 'paginated' ? 'paginated' : 'loadmore'}>
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          ⚡ Pokédex
        </h1>
        <p className="text-gray-500 font-medium mb-8">
          Discover and explore Pokémon with {mode === 'paginated' ? 'page controls' : 'infinite scroll'}
        </p>
        
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setMode('paginated')}
            className={`px-5 py-2 text-sm font-semibold rounded-md transition-all ${
              mode === 'paginated'
                ? 'bg-black text-white shadow-md'
                : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            Page Controls
          </button>
          <button
            onClick={() => setMode('infinite' as any)}
            className={`px-5 py-2 text-sm font-semibold rounded-md transition-all ${
              mode !== 'paginated'
                ? 'bg-black text-white shadow-md'
                : 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            Infinite Scroll
          </button>
        </div>
      </header>

      <Suspense key={mode} fallback={<SkeletonGrid />}>
        {mode === 'paginated' ? <PaginatedView /> : <InfiniteView />}
      </Suspense>
    </PageLayout>
  );
}
