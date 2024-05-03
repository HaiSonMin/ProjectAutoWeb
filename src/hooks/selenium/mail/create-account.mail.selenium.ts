import { IMail } from '@/interfaces/models';
import { delay } from '@/utils';
import { By, WebDriver, until } from 'selenium-webdriver';

export async function createAccountEmailSelenium(
  driver: WebDriver,
  mail: IMail,
) {
  //  Wait for the button to be visible then click
  await delay(1000);
  const btnShowPopCreate = await driver.wait(
    until.elementLocated(By.id('ztabv__HOMEV_output_14___container')),
    5000,
  );

  // Click on the button
  await btnShowPopCreate.click();

  // Fill the email address
  await driver
    .findElement(By.id('zdlgv__NEW_ACCT_name_2'))
    .sendKeys(mail.mail_address.split('@')[0]);
  await delay(500);

  // Fill the first name
  await driver
    .findElement(By.id('zdlgv__NEW_ACCT_givenName'))
    .sendKeys(mail.mail_firstName);
  await delay(500);

  // Fill the last name
  await driver
    .findElement(By.id('zdlgv__NEW_ACCT_sn'))
    .sendKeys(mail.mail_lastName);

  // Fill the password
  await driver
    .findElement(By.id('zdlgv__NEW_ACCT_password'))
    .sendKeys(mail.mail_password);
  await delay(500);

  // Fill the confirm password
  await driver
    .findElement(By.id('zdlgv__NEW_ACCT_confirmPassword'))
    .sendKeys(mail.mail_password);
  await delay(500);

  await driver.findElement(By.id('zdlg__NEW_ACCT_button13_title')).click();
  await delay(1000);

  const btnExist = await driver.findElement(By.id('zdlg__ERR_button2_title'));

  if (btnExist && (await btnExist.isDisplayed())) {
    btnExist.click();
    await delay(300);

    const btnClose = await driver.findElement(By.id('zdlg__NEW_ACCT_minimize'));
    await btnClose.click();
    await delay(300);
  } else {
    console.log('Account created success');
  }
  await delay(500);
}
