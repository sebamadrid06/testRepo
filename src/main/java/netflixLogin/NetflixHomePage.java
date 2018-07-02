package netflixLogin;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class NetflixHomePage extends BasePage{


    public NetflixHomePage(WebDriver pdriver) {
        super(pdriver);
        pdriver.get("http://Netflix.com");
    }

    @FindBy(xpath="//a[@href='/login']")
    private WebElement loginButton;


   public LoginPage clickAction(){


    loginButton.click();
    return new LoginPage(getPdriver());
   }

}
