import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonPage } from '@/api/pokemon';
import { pokemonKeys } from '@/api/queryKeys';
import { POKEMON_PER_PAGE } from '@/config/constants';

export function usePokemonLoadMore() {
  const query = useSuspenseInfiniteQuery({
    queryKey: [...pokemonKeys.lists(), 'loadmore'],
    queryFn: ({ pageParam }) => fetchPokemonPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const fetched = lastPageParam * POKEMON_PER_PAGE;
      return fetched < lastPage.total ? lastPageParam + 1 : undefined;
    },
  });

  const allPokemon = query.data.pages.flatMap((p) => p.pokemon);

  return {
    pokemon: allPokemon,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    total: query.data.pages[0]?.total ?? 0,
  };
}
