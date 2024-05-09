Feature: Display Pokemon details

  Scenario: Display Pokemon details when fetched successfully
    Given the user is viewing a Pokemon page
    When the Pokemon data is successfully fetched
    Then the Pokemon details should be displayed on the page

  Scenario: Display error message when data fetching fails
    Given the user is viewing a Pokemon page
    When the Pokemon data fetch fails
    Then an error message should be displayed