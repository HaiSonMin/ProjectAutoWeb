import { delay } from '@/utils';
import { EStatus } from '@/enums';
import { DriverSelenium } from '@/core';
import { By, WebDriver } from 'selenium-webdriver';
import { MailDtoScratch } from '@/features/scripts/mail/dto';
import { loginMailSelenium } from './login-mail.mail.selenium';
import { PROXY_IPS } from '@/hooks/proxy-ips';

export async function scratchMailAccountSelenium() {
  const driver = await DriverSelenium(PROXY_IPS[0]);
  await loginMailSelenium(driver);
  await delay(3000);

  // 1.Click to Btn Manager
  await driver.findElement(By.id('zti__AppAdmin__Home__manActHV')).click();

  await delay(100);

  const itemsAccounts = await scrapeInfiniteScrollItems(driver);

  return itemsAccounts;
}

const scrapeInfiniteScrollItems = async (driver: WebDriver) => {
  let indexLastItem = 0;
  let items: MailDtoScratch[] = [];
  let itemsTemp: MailDtoScratch[] = [];

  items = await Promise.all(
    (await driver.findElements(By.className('Row'))).map(
      async (item): Promise<MailDtoScratch> => {
        const itemsRow = await item.findElements(By.css('nobr'));

        const values = await Promise.all(
          itemsRow.map(async (column) => {
            const valueCol = await column.getText();
            return valueCol;
          }),
        );

        return {
          mail_address: `${values[0]}`,
          mail_firstName: `${values[1].split(' ')[0]}`,
          mail_lastName: `${values[1].split(' ')[1]}`,
          mail_status: `${EStatus.ACTIVE}`,
          mail_lastLogin: `${values[3]}`,
          mail_description: `${values[4]}`,
        };
      },
    ),
  );

  while (indexLastItem !== items.length) {
    const tableAccounts = await driver.findElement(By.id('zl__ACCT_MANAGE'));

    // Scroll the table using JavaScript
    await driver.executeScript(
      `arguments[0].scrollBy({ top: 2000, behavior: "smooth" });`,
      tableAccounts,
    );

    await delay(500);

    // Update indexLastItem, checkGetAllItems
    indexLastItem = items.length;

    // Overwrite to items => items have updated
    itemsTemp = await Promise.all(
      (await driver.findElements(By.className('Row')))
        .slice(indexLastItem)
        .map(async (item): Promise<MailDtoScratch> => {
          const itemsRow = await item.findElements(By.css('nobr'));

          const values = await Promise.all(
            itemsRow.map(async (column) => {
              const valueCol = await column.getText();
              return valueCol;
            }),
          );

          return {
            mail_address: `${values[0]}`,
            mail_firstName: `${values[1].split(' ')[0]}`,
            mail_lastName: `${values[1].split(' ')[1]}`,
            mail_status: `${EStatus.ACTIVE}`,
            mail_lastLogin: `${values[3]}`,
            mail_description: `${values[4]}`,
          };
        }),
    );

    items.push(...itemsTemp);
  }

  return items;
};
