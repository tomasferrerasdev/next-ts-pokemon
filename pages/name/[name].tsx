import { useEffect, useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import {
  Grid,
  Card,
  Text,
  Button,
  Container,
  Image,
  Row,
} from "@nextui-org/react";
import confetti from "canvas-confetti";

import { pokeAPI } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";
import { PokemonListResponse } from "../../interfaces/pokemon-list";
import { getPokemonData } from "../../utils/getPokemonData";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, [pokemon.id]);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0.9,
        y: 0,
      },
    });
  };

  return (
    <Layout title={`Pokemon | ${pokemon.name}`}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Row wrap="wrap" justify="space-between" align="center">
                <Text h1 transform="capitalize">
                  {pokemon.name}
                </Text>
                <Button
                  size="sm"
                  color="gradient"
                  ghost={!isInFavorites}
                  onClick={onToggleFavorite}
                >
                  {isInFavorites ? "Favorite" : "Add to favorite"}
                </Button>
              </Row>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeAPI.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemonName: string[] = data.results.map((pokemon) => pokemon.name);
  return {
    paths: pokemonName.map((name) => ({
      params: { name },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonData(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonByNamePage;
