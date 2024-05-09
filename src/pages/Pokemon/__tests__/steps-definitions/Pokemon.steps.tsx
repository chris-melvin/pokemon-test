import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import Pokemon from "../..";

const feature = loadFeature(
  "./src/pages/Pokemon/__tests__/features/Pokemon-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Display Pokemon details when fetched successfully", ({
    given,
    when,
    then,
  }) => {
    let wrapper: ShallowWrapper;
    let mockResponse: any;

    beforeEach(() => {
      mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          name: "Pikachu",
          height: 4,
          weight: 60,
          abilities: [{ ability: { name: "static" } }],
          types: [{ type: { name: "electric" } }],
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          },
        }),
      };
    });

    given("the user is viewing a Pokemon page", () => {
      // You can set up any necessary mocks or initial conditions here
    });

    when("the Pokemon data is successfully fetched", () => {
      // Mock the fetch call and provide expected data
      global.fetch = jest.fn().mockResolvedValue(mockResponse);
      // Mount or shallow render the component
      wrapper = shallow(<Pokemon match={{ params: { pokemon: "pikachu" } }} />);
    });

    then("the Pokemon details should be displayed on the page", () => {
      expect(wrapper.find("Typography")).toHaveLength(5);
      expect(wrapper.find("Chip")).toHaveLength(1);
    });
  });

  test("Display error message when data fetching fails", ({
    given,
    when,
    then,
  }) => {
    let wrapper: ShallowWrapper;

    given("the user is viewing a Pokemon page", () => {
      // You can set up any necessary mocks or initial conditions here
    });

    when("the Pokemon data fetch fails", () => {
      // Mock the fetch call to simulate failure
      global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
      // Mount or shallow render the component
      wrapper = shallow(<Pokemon match={{ params: { pokemon: "invalid" } }} />);
    });

    then("an error message should be displayed", () => {
      // Check if the component renders the error message as expected
      expect(wrapper.find("span").text()).toEqual("Error: Network error");
    });
  });
});
