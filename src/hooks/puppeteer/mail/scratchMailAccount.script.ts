import { delay } from '@/utils';
import { Page } from 'puppeteer';
import { loginMail } from './loginMail.script';
import { EStatus } from '@/enums';
import { MailDtoScratch } from '@/features/scripts/mail/dto';

export async function scratchMailAccountScript() {
  // 1.Login to server mail
  const page = await loginMail();

  // 3. Click for redirect to account manager
  const btnManager = await page.$('#zti__AppAdmin__Home__manActHV');
  await btnManager?.click();
  await delay(1000);

  // 2. Get All account items
  const itemsAccounts = await scrapeInfiniteScrollItems(page);

  return itemsAccounts;
}

const scrapeInfiniteScrollItems = async (page: Page) => {
  let indexLastItem = 0;
  let items: MailDtoScratch[] = [];
  let itemsTemp: MailDtoScratch[] = [];

  items = await Promise.all(
    (await page.$$('#zl__DWT83__rows > .Row')).map(
      async (item): Promise<MailDtoScratch> => {
        const itemsRow = await item.$$('nobr');
        const values = await Promise.all(
          itemsRow.map(async (column) => {
            const valueCol = await column.evaluate(
              (value) => value.textContent,
              column,
            );
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
    const tableAccount = await page.$('#zl__ACCT_MANAGE');
    await page.evaluate((table) => {
      table?.scrollBy({
        top: 2000,
        behavior: 'smooth',
      });
    }, tableAccount);

    await delay(500);

    // Update indexLastItem, checkGetAllItems
    indexLastItem = items.length;

    // Overwrite to items => items have updated
    itemsTemp = await Promise.all(
      (await page.$$('#zl__DWT83__rows > .Row'))
        .slice(indexLastItem)
        .map(async (item): Promise<MailDtoScratch> => {
          const itemsRow = await item.$$('nobr');
          const values = await Promise.all(
            itemsRow.map(async (column) => {
              const valueCol = await column.evaluate(
                (value) => value.textContent,
                column,
              );
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
