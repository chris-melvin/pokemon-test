import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import PokemonCard from "../../../../components/Card";
import Library, { Props } from "../..";

const feature = loadFeature(
  "./src/pages/Library/__tests__/features/Library-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Successfully fetching Pokémon data", ({ given, when, then }) => {
    let wrapper: ShallowWrapper<Props, {}, Library>;
    let mockResponse: any;

    beforeEach(() => {
      mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          pokemon_species: [
            { name: "bulbasaur" },
            { name: "charmander" },
            { name: "squirtle" },
          ],
        }),
      };
    });
    given("I have a generation selected", () => {
      // No specific actions required here since we will simulate the selected generation later
    });

    when("I fetch Pokémon data", async () => {
      global.fetch = jest.fn().mockResolvedValue(mockResponse);
      wrapper = shallow(<Library match={{ params: { gen: "1" } }} />);
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
  // Scenario: Display error message when data fetching fails
  //   Given the user is viewing Library page
  //   When the Library data fetch fails
  //   Then an error message should be displayed

  test("Display error message when data fetching fails", ({
    given,
    when,
    then,
  }) => {
    let wrapper: ShallowWrapper<Props, {}, Library>;
    let mockResponse: any;

    beforeEach(() => {
      mockResponse = {
        ok: false,
        status: 404,
        statusText: "Not Found",
      };
    });

    given("the user is viewing Library page", () => {
      // No specific actions required here since we will simulate the user viewing the page later
    });

    when("the Library data fetch fails", async () => {
      global.fetch = jest.fn().mockResolvedValue(mockResponse);
      wrapper = shallow(<Library match={{ params: { gen: "1" } }} />);
    });

    then("an error message should be displayed", () => {
      expect(wrapper.state("isLoading")).toBe(false);
      expect(wrapper.state("error")).toEqual(
        new Error("Network response was not ok")
      );
    });
  });
});
