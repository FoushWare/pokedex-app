import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemonPage } from '@/api/pokemon';
import { pokemonKeys } from '@/api/queryKeys';

export function usePokemonList(page: number) {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey: pokemonKeys.list(page),
    queryFn: async () => {
      const data = await fetchPokemonPage(page);
      // Prime the cache for each pokemon detail
      data.details.forEach((detail) => {
        queryClient.setQueryData(pokemonKeys.detail(detail.id), detail);
      });
      return data;
    },
  });
}
