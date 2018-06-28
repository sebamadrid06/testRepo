package netflixLogin;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;

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

    public void loginAction(String userName, String userPassword){

        emailField.sendKeys(userName);
        passwordField.sendKeys((userPassword));
        getWait().until(ExpectedConditions.elementToBeClickable(sendCredentialsButton));
        sendCredentialsButton.click();
    }




}

