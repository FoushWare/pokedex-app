import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '@/api/pokemon';
import { pokemonKeys } from '@/api/queryKeys';

export function usePokemonDetail(id: string | number) {
  return useSuspenseQuery({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => fetchPokemonDetail(id),
  });
}
