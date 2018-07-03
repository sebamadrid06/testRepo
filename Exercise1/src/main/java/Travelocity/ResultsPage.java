package Travelocity;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

import java.util.Iterator;
import java.util.List;

public class ResultsPage extends BasePage{


    public ResultsPage(WebDriver pdriver) {

        super(pdriver);

    }
    @FindBy(name="sort")
    public WebElement sortElement;
    public void checkElements(){

        Select orderBy;
        orderBy = new Select(getDriver().findElement(By.name("sort")));
        orderBy.selectByValue("price:asc");
        getWait().until(ExpectedConditions.elementToBeClickable(sortElement));
        orderBy.selectByValue("price:desc");
        getWait().until(ExpectedConditions.elementToBeClickable(sortElement));
        orderBy.selectByValue("duration:asc");
        getWait().until(ExpectedConditions.elementToBeClickable(sortElement));
        orderBy.selectByValue("duration:desc");
        getWait().until(ExpectedConditions.elementToBeClickable(sortElement));
        orderBy.selectByValue("departuretime:asc");
        getWait().until(ExpectedConditions.elementToBeClickable(sortElement));
        orderBy.selectByValue("departuretime:desc");
        getWait().until(ExpectedConditions.elementToBeClickable(sortElement));
        orderBy.selectByValue("arrivaltime:asc");
        getWait().until(ExpectedConditions.elementToBeClickable(sortElement));
        orderBy.selectByValue("arrivaltime:desc");


    }


    public void checkButton() {

        System.out.println("OK");
        List <WebElement> obj = getDriver().findElements(By.xpath("//ul[@id='flightModuleList']"));

        for (int i = 0 ; i <obj.size() ; i++)
        {
            WebElement item = obj.get(i);
            System.out.println("****"+item.getText());
        }


    }

}
