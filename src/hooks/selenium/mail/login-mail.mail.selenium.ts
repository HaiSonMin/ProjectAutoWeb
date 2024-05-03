import { MailDtoCreateRandom } from '@/features/scripts/mail/dto';
import { delay } from '@/utils';
import { BadRequestException } from '@nestjs/common';
import { By, Key, WebDriver } from 'selenium-webdriver';

export const loginMailSelenium = async (
  driver: WebDriver,
  dataLogin: Pick<MailDtoCreateRandom, 'mail_address' | 'mail_password'>,
) => {
  console.log('Starting selenium success');
  try {
    await driver.get('https://mail.nikolaxflem.com:7071/zimbraAdmin/');

    // Enter UserName
    await driver
      .findElement(By.id('ZLoginUserName'))
      .sendKeys(dataLogin.mail_address);
    await delay(500);

    // Enter Password
    await driver
      .findElement(By.id('ZLoginPassword'))
      .sendKeys(dataLogin.mail_password, Key.ENTER);
    await delay(1000);
  } catch {
    await driver.quit();
    throw new BadRequestException('Lỗi xảy ra, vui lòng thử lại');
  }
};
