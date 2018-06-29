package netflixLogin;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class AListener implements ITestListener {

    public void onTestStart(ITestResult iTestResult) {

    }

    public void onTestSuccess(ITestResult iTestResult) {

        System.out.println("Test Passed");

    }

    public void onTestFailure(ITestResult iTestResult) {
        System.out.println("Test Failed");
    }

    public void onTestSkipped(ITestResult iTestResult) {

    }

    public void onTestFailedButWithinSuccessPercentage(ITestResult iTestResult) {

    }

    public void onStart(ITestContext iTestContext) {

    }

    public void onFinish(ITestContext iTestContext) {

    }
}
