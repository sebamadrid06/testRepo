package netflixLogin;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasePage {

    private WebDriver driver;
    private WebDriverWait wait;

    public BasePage(WebDriver pdriver) {

        wait = new WebDriverWait(pdriver,10);
        PageFactory.initElements(pdriver, this);
        pdriver=driver;
            }

    public WebDriver getPdriver() {
        return driver;
    }

    public WebDriverWait getWait() {
        return wait;
    }


    public void dispose() {

        if (driver != null) {
            driver.quit();
        }


    }
}
