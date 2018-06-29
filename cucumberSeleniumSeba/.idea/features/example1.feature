Feature: Example

  @example1
  Scenario: Example 1

    Given I am a customer on login page
    When I click on the first login button on login page
    Then the login page form container should be displayed
    When I enter valid user credentials
    Then the login page second login button should be displayed
    And I wait 10 seconds to check the web for a while
