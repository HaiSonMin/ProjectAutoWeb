import { SCRIPT_CONST } from '@/constants';
import { delay } from '@/utils';
import { BadRequestException } from '@nestjs/common';
import { By, Key, WebDriver } from 'selenium-webdriver';

export const loginMailSelenium = async (driver: WebDriver) => {
  console.log('Starting selenium success');
  try {
    await driver.get(SCRIPT_CONST.MAIL_URL);

    // Enter UserName
    await driver
      .findElement(By.id('ZLoginUserName'))
      .sendKeys(process.env.SERVER_MAIL_USER);
    await delay(500);

    // Enter Password
    await driver
      .findElement(By.id('ZLoginPassword'))
      .sendKeys(process.env.SERVER_MAIL_PASS, Key.ENTER);
    await delay(500);
  } catch {
    await driver.quit();
    throw new BadRequestException('Lỗi xảy ra, vui lòng thử lại');
  }
};
