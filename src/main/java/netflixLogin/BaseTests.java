package netflixLogin;

import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Parameters;

public class BaseTests {


    ADriver myDriver;

    private NetflixHomePage netflixHome;

    @BeforeSuite(alwaysRun=true)
    @Parameters({"browser"})
    public void beforeSuite(String browser){

        myDriver = new ADriver(browser);
        netflixHome = new NetflixHomePage(myDriver.getDriver());

    }

    @AfterSuite(alwaysRun = true)
    public void afterSuite(){

        netflixHome.dispose();

    }

    public NetflixHomePage getNetflixHome() {
        return netflixHome;
    }


}
