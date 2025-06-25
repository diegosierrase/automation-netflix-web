Feature: Search for movies by genre

# Scenario Outline: Search for thriller movies
#     Given user login with valid credentials and select profile from id "<idLogin>"
#     When user Select genre with id "<idGenre>"
#     And user print names of the movies with id "<idGenre>"

#     Examples:
#         | idLogin | idGenre |
#         | 1       | 1       |

Scenario Outline: Search for thriller movies
    Given user open Netflix login page
    When user enters valid credentials from id "<idLogin>"
    And user selects profile from id "<idLogin>"
    And user select genre with id "<idGenre>"
    And user print names of the movies with id "<idGenre>"

    Examples:
        | idLogin | idGenre |
        | 1       | 1       |