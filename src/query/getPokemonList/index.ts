const getPokemonList = async (gen: string) => {
  const fetchGenerationList = fetch(
    `https://pokeapi.co/api/v2/generation/${gen}`
  );

  const response = await fetchGenerationList;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return {
    data: data,
  };
};
export default getPokemonList;
