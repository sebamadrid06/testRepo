package Travelocity;

import Travelocity.HomePage;
import Travelocity.NewDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Parameters;

public class TestBase {

NewDriver myDriver;

    private HomePage homePage;

@BeforeSuite(alwaysRun = true)
    @Parameters({"browser"})
    public void beforeSuite(String browser){

    myDriver = new NewDriver(browser);
    homePage = new HomePage(myDriver.getDriver());
}
@AfterSuite(alwaysRun = true)
public void afterSuite(){

    homePage.dispose();

}

    public HomePage getHomePage() {
        return homePage;
    }
}
