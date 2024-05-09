const getPokemon = async (name: string) => {
  const getPokemonRequest = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  const response = await getPokemonRequest;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return {
    data: data,
  };
};
export default getPokemon;
