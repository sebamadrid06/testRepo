package netflixLogin;

import com.google.common.base.Preconditions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Parameters;

public class LoginPage extends BasePage {


    public LoginPage(WebDriver pdriver) {
        super(pdriver);

    }

    @FindBy(id = "email")
    private WebElement emailField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(xpath = "//button[@class='btn login-button btn-submit btn-small']")
    private WebElement sendCredentialsButton;

    @Parameters({"username","password"})
    public ContentPage loginAction(String username, String password){

        emailField.sendKeys(Preconditions.checkNotNull(username, "ERROR"));
        passwordField.sendKeys(Preconditions.checkNotNull(password), "ERROR");
        getWait().until(ExpectedConditions.elementToBeClickable(sendCredentialsButton));
        sendCredentialsButton.click();
        return new ContentPage(getPdriver());
    }






}

