export const pokemonKeys = {
  all: ['pokemon'] as const,
  lists: () => [...pokemonKeys.all, 'list'] as const,
  list: (page: number) => [...pokemonKeys.lists(), page] as const,
  details: () => [...pokemonKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...pokemonKeys.details(), id] as const,
};
