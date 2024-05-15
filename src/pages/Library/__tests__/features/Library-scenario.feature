Feature: Fetching Pokémon data based on generation

  Scenario: Successfully fetching Pokémon data
    Given I have a generation selected
    When I fetch Pokémon data
    Then I should receive Pokémon data for that generation
    And I should see Pokémon cards displayed

  Scenario: Display error message when data fetching fails
    Given the user is viewing Library page
    When the Library data fetch fails
    Then an error message should be displayed
  
  Scenario: Change Pokémon data when generation is changed
    Given I have a generation selected
    When I change the generation
    Then I should receive Pokémon data for the new generation
    And I should see Pokémon cards displayed