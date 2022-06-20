import { useState, useEffect } from "react";
import { Card, Grid } from "@nextui-org/react";

import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";

export const favoritePage = () => {
  const [favouritePokemons, setFavouritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavouritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemon | Favorite">
      {favouritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <Grid.Container gap={2} direction="row" justify="flex-start">
          {favouritePokemons.map((id) => (
            <Grid key={id} xs={6} sm={3} md={2} xl={1}>
              <Card hoverable clickable css={{ padding: 10 }}>
                <Card.Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                  width={"100%"}
                  height={140}
                />
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      )}
    </Layout>
  );
};

export default favoritePage;
