import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPokemonPage } from '@/api/pokemon';
import { pokemonKeys } from '@/api/queryKeys';

export function usePokemonList(page: number) {
  return useSuspenseQuery({
    queryKey: pokemonKeys.list(page),
    queryFn: () => fetchPokemonPage(page),
  });
}
