package netflixLogin;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class ADriver {

    private WebDriver driver;

    public ADriver(String browser) {

        if (browser.equals("firefox")) {

            driver = new FirefoxDriver();


        }
        if (browser.equals("chrome")) {
            System.setProperty("webdriver.chrome.driver", "C:\\Users\\hugo.madrid\\chromedriver_win32\\chromedriver.exe");
            driver = new ChromeDriver();

        }

    }

    public WebDriver getDriver() {
        return this.driver;
    }
}
