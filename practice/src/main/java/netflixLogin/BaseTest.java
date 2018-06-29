package netflixLogin;

import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Parameters;

public class BaseTest {

    ADriver btDriver;

    private NetflixHomePage homePage;

    @BeforeSuite(alwaysRun = true)
    @Parameters({"browser"})
    public void beforeSuite(String browser){

        btDriver = new ADriver(browser);
        homePage = new NetflixHomePage(btDriver.getDriver());

    }
    public void afterSuite(){

        homePage.dispose();

    }

    public NetflixHomePage getHomePage() {
        return homePage;
    }
}
