import { abilities, stats, types } from "../../pages/Pokemon";

const getPokemon = async (name: string) => {
  const getPokemonRequest = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  const response = await getPokemonRequest;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return {
    data: {
      name: data.name,
      sprites: {
        other: {
          showdown: {
            front_default: data.sprites.other.showdown.front_default,
          },
        },
      },
      types: data.types.map((type: types) => {
        return {
          type: {
            name: type.type.name,
          },
        };
      }),
      stats: data.stats.map((stat: stats) => ({
        stat: {
          name: stat.stat.name,
        },
        base_stat: stat.base_stat,
      })),
      height: data.height,
      weight: data.weight,
      species: {
        name: data.species.name,
      },
      abilities: data.abilities.map((ability: abilities) => {
        return {
          ability: {
            name: ability.ability.name,
          },
        };
      }),
    },
  };
};
export default getPokemon;
