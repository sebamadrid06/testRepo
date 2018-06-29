package netflixLogin.Tests;

import netflixLogin.*;
import org.apache.http.util.Asserts;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;


public class NetflixLoginTest extends BaseTest {


    public void netflixTest(){

        NetflixHomePage home = getHomePage();
        LoginPage loginPage = home.clickAction();


    }


}
