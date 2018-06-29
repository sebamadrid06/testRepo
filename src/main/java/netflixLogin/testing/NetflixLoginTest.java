package netflixLogin.testing;

import netflixLogin.BaseTests;
import netflixLogin.ContentPage;
import netflixLogin.LoginPage;
import netflixLogin.NetflixHomePage;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class NetflixLoginTest extends BaseTests {

    @Test
    @Parameters({"username","password"})
    public void init(String username, String password) {
        NetflixHomePage home = getNetflixHome();
        LoginPage loginPage = home.clickAction();
        ContentPage contentPage = loginPage.loginAction(username,password);
    }
}
