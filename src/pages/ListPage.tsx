import { useState, Suspense, useCallback, useRef, useEffect } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { usePokemonList } from '@/hooks/usePokemonList';
import { fetchPokemonPage } from '@/api/pokemon';
import { pokemonKeys } from '@/api/queryKeys';
import PokemonCard from '@/components/ui/PokemonCard';
import SkeletonGrid from '@/components/ui/SkeletonGrid';
import PokemonPagination from '@/components/ui/PokemonPagination';

type Mode = 'paginated' | 'infinite';

function PaginatedList() {
  const [page, setPage] = useState(1);
  const { data } = usePokemonList(page);
  const totalPages = Math.ceil(data.total / 20);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      <PokemonPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <p className="text-center text-sm text-muted-foreground mt-2">
        Page {page} of {totalPages} ({data.total} Pokémon shown)
      </p>
    </>
  );
}

function InfiniteList() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: [...pokemonKeys.lists(), 'infinite'],
    queryFn: ({ pageParam }) => fetchPokemonPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const fetched = lastPageParam * 20;
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
      <p className="text-center text-sm text-muted-foreground mt-2">
        Showing {allPokemon.length} Pokémon
      </p>
    </>
  );
}

export default function ListPage() {
  const [mode, setMode] = useState<Mode>('paginated');

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-foreground mb-1">⚡ Pokédex</h1>
        <p className="text-center text-muted-foreground mb-6">Discover and explore Pokémon with {mode === 'paginated' ? 'page controls' : 'infinite scroll'}</p>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setMode('paginated')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'paginated'
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-foreground hover:bg-muted'
            }`}
          >
            Page Controls
          </button>
          <button
            onClick={() => setMode('infinite')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'infinite'
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-foreground hover:bg-muted'
            }`}
          >
            Infinite Scroll
          </button>
        </div>

        <Suspense fallback={<SkeletonGrid />}>
          {mode === 'paginated' ? <PaginatedList /> : <InfiniteList />}
        </Suspense>
      </div>
    </div>
  );
}
