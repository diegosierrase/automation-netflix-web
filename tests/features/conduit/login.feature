Feature: User Login to Conduit

  Scenario Outline: Successful Login with Valid Credentials
    Given user open conduit login page
    When user enters valid credentials from id "<idLogin>"
    Then user should see a menu "Settings"

    Examples:
      | idLogin |
      | 1       |