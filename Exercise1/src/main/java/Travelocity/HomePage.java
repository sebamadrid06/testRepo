package Travelocity;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

public class HomePage extends BasePage{

    Actions action = new Actions(getDriver());
    public HomePage(WebDriver pdriver) {
        super(pdriver);
        pdriver.get("http://travelocity.com");
    }



    @FindBy(id ="tab-flight-tab-hp")
    private WebElement flightsButton;

    @FindBy(xpath = "//a[@id='aria-option-0']//span[@class='text']//div[@class='multiLineDisplay']")
    private WebElement selectOrigin;

    @FindBy(xpath = "//a[@id='aria-option-0']//span[@class='text']//div[@class='multiLineDisplay']")
    private WebElement selectDestiny;


    @FindBy(id = "flight-origin-hp-flight")
    private WebElement flyingFrom;

    @FindBy(id = "flight-destination-hp-flight")
    private WebElement flyingTo;

    @FindBy(id = "flight-type-roundtrip-label-hp-flight")
    private WebElement roundtripButton;

    @FindBy(id = "flight-departing-hp-flight")
    private WebElement departingDate;

    @FindBy(id = "flight-returning-hp-flight")
    private  WebElement returningDate;

    //@FindBy(id = "flight-adults-hp-flight")
    //private Select adultsCombo;

    //@FindBy(id = "flight-adults-hp-flight")
    //private  WebElement adults;



    @FindBy(xpath = "//html//section[@id='WizardHero']//button[2]")
    private WebElement calendarNextButton;

    @FindBy(xpath = "//div[@class='datepicker-close']//button[@type='button']")
    private  WebElement calendarCloseButton;

    @FindBy(xpath = "//a[@id='aria-option-0']//span[@class='text']//div[@class='multiLineDisplay']" )
    private WebElement cityResults;
    //Search for a flight action

    @FindBy(xpath = "//html//tr[1]/td[2]/button[1]")
    private WebElement departingDay;

    @FindBy(xpath = "//html//div[3]/table[1]/tbody[1]/tr[5]/td[4]/button[1]")
    private WebElement returningDay;

    @FindBy(xpath = "//form[@id='gcw-flights-form-hp-flight']//div[@class='cols-nested']//label[@class='col search-btn-col']//button[@type='submit']")
    private WebElement searchButton;

    public ResultsPage searchFlightAction(){

//        getWait().until(ExpectedConditions.elementToBeClickable(flightsButton));
        flightsButton.click();
        roundtripButton.click();
        flyingFrom.click();
        flyingFrom.sendKeys("buenos aires");
        getWait().until(ExpectedConditions.elementToBeClickable(cityResults));
        selectOrigin.click();
        flyingTo.click();
        flyingTo.sendKeys("london");
        getWait().until(ExpectedConditions.elementToBeClickable(cityResults));
        selectDestiny.click();
        departingDate.click();
        calendarNextButton.click();
        calendarNextButton.click();
        departingDay.click();
        returningDate.click();
        returningDay.click();
        Select adultos = new Select(getDriver().findElement(By.id("flight-adults-hp-flight")));
        adultos.selectByValue("1");
        searchButton.click();


        return new ResultsPage(getDriver());

    }





}
