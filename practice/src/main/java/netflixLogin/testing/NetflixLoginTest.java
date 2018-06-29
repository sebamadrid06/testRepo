package netflixLogin.testing;
import netflixLogin.BaseTests;
import netflixLogin.ContentPage;
import netflixLogin.LoginPage;
import netflixLogin.NetflixHomePage;
import org.testng.annotations.Test;

public class NetflixLoginTest extends BaseTests {

    @Test
    public void init() {
        NetflixHomePage home = getNetflixHome();
        LoginPage loginPage = home.clickAction();
        ContentPage contentPage = loginPage.loginAction("martaelisarodriguez@hotmail.com", "MARTA52LEO");
        //assertThat()''
    }
}
