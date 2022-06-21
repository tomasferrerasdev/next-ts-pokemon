import { pokeAPI } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonData = async (idOrName: string) => {
  const { data } = await pokeAPI.get<Pokemon>(`/pokemon/${idOrName}`);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
};
