import { WebDriver } from 'selenium-webdriver';

export async function createAccountFacebookSelenium(driver: WebDriver) {
  // 1.Go to facebook
  await driver.get('https://www.facebook.com');
}
