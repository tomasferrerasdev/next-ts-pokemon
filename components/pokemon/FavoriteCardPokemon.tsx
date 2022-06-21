import { FC } from "react";
import { useRouter } from "next/router";
import { Grid, Card } from "@nextui-org/react";

interface Props {
  pokemonID: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonID }) => {
  const router = useRouter();
  const onFavoriteClick = () => {
    router.push(`/pokemon/${pokemonID}`);
  };

  return (
    <Grid key={pokemonID} xs={6} sm={3} md={2} xl={1} onClick={onFavoriteClick}>
      <Card hoverable clickable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};
