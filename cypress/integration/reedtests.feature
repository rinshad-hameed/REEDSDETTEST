#

Feature: Reed search funtionality

    Scenario: Search for engineers
    Given Go to reed website 
    When I search with below criteria
      | JOBTITLE | LOCATION |
      | Engineer | South West London |        
    Then validate 5 randomly selected results for the text "Engineer"
    And Validate atleast 5 results are from location "London"
    When Filter "Financial Services" Specialisms
    Then Validate the job count equal to the total jobs
