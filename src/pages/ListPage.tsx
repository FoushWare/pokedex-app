import { useState, Suspense, useCallback, useRef, useEffect } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { usePokemonList } from '@/hooks/usePokemonList';
import { fetchPokemonPage } from '@/api/pokemon';
import { pokemonKeys } from '@/api/queryKeys';
import { POKEMON_PER_PAGE } from '@/config/constants';
import PokemonCard from '@/components/ui/PokemonCard';
import SkeletonGrid from '@/components/ui/SkeletonGrid';
import PokemonPagination from '@/components/ui/PokemonPagination';

type Mode = 'paginated' | 'infinite';

function PaginatedList() {
  const [page, setPage] = useState(1);
  const { data } = usePokemonList(page);
  const totalPages = Math.ceil(data.total / POKEMON_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      <PokemonPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
        Page {page} of {totalPages} <span className="opacity-70">({POKEMON_PER_PAGE} Pokémon per page)</span>
      </p>
    </>
  );
}

function LoadMoreList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: [...pokemonKeys.lists(), 'infinite'],
    queryFn: ({ pageParam }) => fetchPokemonPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const fetched = lastPageParam * POKEMON_PER_PAGE;
      return fetched < lastPage.total ? lastPageParam + 1 : undefined;
    },
  });

  const allPokemon = data.pages.flatMap((p) => p.pokemon);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      
      {hasNextPage && (
        <div className="flex justify-center mt-12 pb-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2"
          >
            {isFetchingNextPage ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      {!hasNextPage && (
        <p className="text-center text-muted-foreground mt-8 pb-8">All Pokémon loaded!</p>
      )}

      <p className="text-center text-sm text-muted-foreground mt-2 font-medium">
        Showing {allPokemon.length} Pokémon <span className="opacity-70">({POKEMON_PER_PAGE} per load)</span>
      </p>
    </>
  );
}

export default function ListPage() {
  const [mode, setMode] = useState<Mode>('paginated');

  return (
    <div className={`min-h-screen transition-colors duration-500 py-8 px-4 ${
      mode === 'paginated' ? 'bg-[#F8FBFF]' : 'bg-[#F6FFF8]'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-foreground mb-1">⚡ Pokédex</h1>
        <p className="text-center text-muted-foreground mb-6 font-medium">
          Discover and explore Pokémon with {mode === 'paginated' ? 'page controls' : 'load more button'}
        </p>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setMode('paginated')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'paginated'
                ? 'bg-primary text-primary-foreground font-bold'
                : 'border border-border text-foreground hover:bg-muted'
            }`}
          >
            Pagination
          </button>
          <button
            onClick={() => setMode('infinite')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'infinite'
                ? 'bg-primary text-primary-foreground font-bold'
                : 'border border-border text-foreground hover:bg-muted'
            }`}
          >
            Load More
          </button>
        </div>

        <Suspense fallback={<SkeletonGrid />}>
          {mode === 'paginated' ? <PaginatedList /> : <LoadMoreList />}
        </Suspense>
      </div>
    </div>
  );
}
