import { Builder, Browser, By, Key, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export const loginMailSelenium = async () => {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--incognito');
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromeOptions)
    .build();
  try {
    console.log('Starting selenium success');
    // await driver.get('https://www.google.com/ncr');
    await driver.get('chrome://version/');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } catch {
  } finally {
    console.log('Stop selenium ');

    // await driver.quit();
  }
};
