package Travelocity.testing;

import Travelocity.BasePage;
import Travelocity.HomePage;
import Travelocity.ResultsPage;
import Travelocity.TestBase;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class TestingExercise1 extends TestBase {

@Test
public void init(){

    HomePage home = getHomePage();
    ResultsPage results = home.searchFlightAction();


}

}
