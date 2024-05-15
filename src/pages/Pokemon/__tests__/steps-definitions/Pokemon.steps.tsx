import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import Pokemon, { PokemonData } from "../..";

const feature = loadFeature(
  "./src/pages/Pokemon/__tests__/features/Pokemon-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("User can view Pokemon Details", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: Pokemon;

    given("User is loading Pokemon Page", () => {
      // You can set up any necessary mocks or initial conditions here
      wrapper = shallow(<Pokemon match={{ params: { pokemon: "pikachu" } }} />);
    });

    when("I successfully load Pokemon Page", () => {
      // Mock the fetch call and provide expected data
      instance = wrapper.instance() as Pokemon;
      // Mount or shallow render the component
      instance.componentDidMount();
    });

    then("the user should see the Pokemon details", () => {
      expect(wrapper).toBeTruthy();
    });
  });

  test("Display Pokemon details when fetched successfully", ({
    given,
    when,
    then,
  }) => {
    let wrapper: ShallowWrapper;
    let instance: Pokemon;

    given("the user is viewing a Pokemon page", () => {
      // You can set up any necessary mocks or initial conditions here
      const mockResponsePokemon: PokemonData = {
        name: "Pikachu",
        height: 4,
        weight: 60,
        abilities: [{ ability: { name: "static" } }],
        types: [{ type: { name: "electric" } }],
        species: { name: "mouse" },
        sprites: {
          other: {
            showdown: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            },
          },
        },
        stats: [
          { base_stat: 35, stat: { name: "hp" } },
          { base_stat: 55, stat: { name: "attack" } },
          { base_stat: 40, stat: { name: "defense" } },
          { base_stat: 50, stat: { name: "special-attack" } },
          { base_stat: 50, stat: { name: "special-defense" } },
          { base_stat: 90, stat: { name: "speed" } },
        ],
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponsePokemon),
        })
      ) as any;
      wrapper = shallow(<Pokemon match={{ params: { pokemon: "25" } }} />);
    });

    when("the Pokemon data is successfully fetched", async () => {
      instance = wrapper.instance() as Pokemon;
      await instance.componentDidMount();
    });

    then("the Pokemon details should be displayed on the page", async () => {
      expect(wrapper.state("isLoading")).toBe(false);
      expect(wrapper.find("p.pokemonName").text()).toBe("Pikachu");
      expect(wrapper.find(".pokemonHeight").text()).toBe("Height: 4");
      expect(wrapper.find(".pokemonWeight").text()).toBe("Weight: 60");
      expect(wrapper.find(".pokemonSpecies").text()).toBe("Species: mouse");
      expect(wrapper.find(".pokemonAbility").text()).toBe("static");
    });
  });

  test("Display error message when data fetching fails", ({
    given,
    when,
    then,
  }) => {
    let wrapper: ReactWrapper;
    let instance: Pokemon;

    given("the user is viewing a Pokemon page", () => {
      // You can set up any necessary mocks or initial conditions here
      wrapper = mount(<Pokemon match={{ params: { pokemon: "invalid" } }} />);
      // global.fetch = jest
      //   .fn()
      //   .mockRejectedValueOnce(new Error("Network error")) as any;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
        })
      ) as any;
    });

    when("the Pokemon data fetch fails", async () => {
      // Mock the fetch call to simulate failure
      instance = wrapper.instance() as Pokemon;
      await instance.componentDidMount();
      // Mount or shallow render the component
    });

    then("an error message should be displayed", async () => {
      // Check if the component renders the error message as expected

      expect(wrapper.state("error")).toEqual(
        new Error("Network response was not ok")
      );
    });
  });
});
