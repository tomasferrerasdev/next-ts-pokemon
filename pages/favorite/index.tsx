import { useState, useEffect } from "react";

import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon";

export const FavoritePage = () => {
  const [favouritePokemons, setFavouritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavouritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemon | Favorite">
      {favouritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favouritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritePage;
