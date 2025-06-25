Feature: User Login to Netflix

  Scenario Outline: Successful Login with Valid Credentials
    Given user open Netflix login page
    When user enters valid credentials from id "<idLogin>"
    And user selects profile from id "<idLogin>"
    Then user should see a welcome message "Inicio"

    Examples:
      | idLogin |
      | 1       |