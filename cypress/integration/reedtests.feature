#

Feature: Reed search funtionality

    Scenario: Search for engineers
    Given I go to reed website 
    Then  search with below criteria
      | JOBTITLE | LOCATION |
      | Engineer | South West London |    
