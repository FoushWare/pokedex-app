import { API_BASE_URL, POKEMON_PER_PAGE } from '@/config/constants';
import type { PokemonListResponse, PokemonDetail, PokemonCardData } from '@/types/pokemon.types';
export async function fetchPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
  const res = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  return res.json();
}
export async function fetchPokemonDetail(id: string | number): Promise<PokemonDetail> {
  const res = await fetch(`${API_BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon #${id}`);
  return res.json();
}
export async function fetchPokemonPage(page: number, limit = POKEMON_PER_PAGE): Promise<{ pokemon: PokemonCardData[]; total: number; details: PokemonDetail[] }> {
  const offset = (page - 1) * limit;
  const list = await fetchPokemonList(limit, offset);
  
  const details = await Promise.all(
    list.results.map((result) => {
      const parts = result.url.split('/').filter(Boolean);
      const id = parts[parts.length - 1];
      return fetchPokemonDetail(id);
    })
  );

  return {
    pokemon: details.map((d) => ({
      id: d.id,
      name: d.name,
      sprite: d.sprites.other['official-artwork'].front_default
    })),
    total: list.count,
    details,
  };
}
