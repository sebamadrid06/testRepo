package Travelocity;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasePage {
    private WebDriverWait wait;
    private WebDriver driver;

    public BasePage(WebDriver pdriver) {

        PageFactory.initElements(pdriver,10);
        wait = new WebDriverWait(pdriver, 10);
        driver = pdriver;
    }

    public WebDriverWait getWait() {

        return wait;

    }

    public WebDriver getDriver() {

        return driver;

    }

    public void dispose(){
        if(driver!=null){
            driver.quit();
        }

    }


}
