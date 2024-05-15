import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import PokemonCard from "../../../../components/Card";
import Library, { Props } from "../..";

const feature = loadFeature(
  "./src/pages/Library/__tests__/features/Library-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Successfully fetching Pokémon data", ({ given, when, then }) => {
    let wrapper: ShallowWrapper<Props, {}, Library>;
    let instance: Library;

    given("I have a generation selected", () => {
      const mockResponse = {
        pokemon_species: [
          { name: "bulbasaur" },
          { name: "charmander" },
          { name: "squirtle" },
        ],
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      ) as any;
      wrapper = shallow(<Library match={{ params: { gen: "1" } }} />);
    });

    when("I fetch Pokémon data", async () => {
      instance = wrapper.instance() as Library;
      await instance.componentDidMount();
    });

    then("I should receive Pokémon data for that generation", () => {
      expect(wrapper.state("isLoading")).toBe(false);
      expect(wrapper.state("data")).toEqual({
        pokemon_species: [
          { name: "bulbasaur" },
          { name: "charmander" },
          { name: "squirtle" },
        ],
      });
    });

    then("I should see Pokémon cards displayed", () => {
      expect(wrapper.find(PokemonCard)).toHaveLength(3); // Assuming 3 Pokémon species in the mock data
    });
  });

  test("Display error message when data fetching fails", ({
    given,
    when,
    then,
  }) => {
    let wrapper: ShallowWrapper<Props, {}, Library>;
    let instance: Library;

    given("the user is viewing Library page", () => {
      // No specific actions required here since we will simulate the user viewing the page later
      wrapper = shallow(<Library match={{ params: { gen: "99" } }} />);
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
        })
      ) as any;
    });

    when("the Library data fetch fails", async () => {
      instance = wrapper.instance() as Library;
      await instance.componentDidMount();
    });

    then("an error message should be displayed", () => {
      expect(wrapper.state("isLoading")).toBe(false);
      expect(wrapper.state("error")).toEqual(
        new Error("Network response was not ok")
      );
    });
  });

  // Scenario: Change Pokémon data when generation is changed
  // Given I have a generation selected
  // When I change the generation
  // Then I should receive Pokémon data for the new generation
  // And I should see Pokémon cards displayed

  test("Change Pokémon data when generation is changed", ({
    given,
    when,
    then,
  }) => {
    let wrapper: ShallowWrapper<Props, {}, Library>;
    let instance: Library;

    given("I have a generation selected", () => {
      const mockResponse = {
        pokemon_species: [
          { name: "bulbasaur" },
          { name: "charmander" },
          { name: "squirtle" },
        ],
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      ) as any;
      wrapper = shallow(<Library match={{ params: { gen: "1" } }} />);
    });

    when("I change the generation", async () => {
      instance = wrapper.instance() as Library;
      wrapper.simulate("update", { match: { params: { gen: "2" } } });
      const mockResponse = {
        pokemon_species: [
          {
            name: "Chikorita",
          },
          {
            name: "Cyndaquil",
          },
          {
            name: "Totodile",
          },
        ],
      };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      ) as any;
      await instance.componentDidUpdate({ match: { params: { gen: "2" } } });
    });

    then("I should receive Pokémon data for the new generation", () => {
      expect(wrapper.state("isLoading")).toBe(false);
      expect(wrapper.state("data")).toEqual({
        pokemon_species: [
          {
            name: "Chikorita",
          },
          {
            name: "Cyndaquil",
          },
          {
            name: "Totodile",
          },
        ],
      });
    });

    then("I should see Pokémon cards displayed", () => {
      expect(wrapper.find(PokemonCard)).toHaveLength(3); // Assuming 3 Pokémon species in the mock data
    });
  });
});
