import { Page } from 'puppeteer';
import { delay } from '@/utils';
import { IMail } from '@/interfaces/models';
import { BadRequestException } from '@nestjs/common';

export async function createAccountScript(page: Page, account: IMail) {
  try {
    const btnShowPopCreate = await page.waitForSelector(
      '#ztabv__HOMEV_output_14___container',
      {
        visible: true,
      },
    );
    await btnShowPopCreate.click();

    await delay(100);

    const inputAccountName = await page.$('#zdlgv__NEW_ACCT_name_2');
    await inputAccountName?.type(`${account.mail_address.split('@')[0]}`, {
      delay: 10,
    });

    const inputFirstName = await page.$('#zdlgv__NEW_ACCT_givenName');
    await inputFirstName?.type(`${account.mail_firstName}`, {
      delay: 10,
    });

    const inputLastName = await page.$('#zdlgv__NEW_ACCT_sn');
    await inputLastName?.type(`${account.mail_lastName}`, {
      delay: 10,
    });

    const inputPassName = await page.$('#zdlgv__NEW_ACCT_password');
    await inputPassName?.type(`${account.mail_password}`, { delay: 10 });

    const inputConfirmPassName = await page.$(
      '#zdlgv__NEW_ACCT_confirmPassword',
    );
    await inputConfirmPassName?.type(`${account.mail_password}`, { delay: 10 });

    await delay(500);
    const btnSubmit = await page.$('#zdlg__NEW_ACCT_button13_title');
    await btnSubmit?.click();
    await delay(50);

    // If account have exit
    const btnExist = await page.$('#zdlg__ERR_button2_title');
    if (btnExist && (await btnExist.isIntersectingViewport())) {
      btnExist.click();
      await delay(100);

      const btnClose = await page.$('#zdlg__NEW_ACCT_minimize');
      await btnClose.click();
      await delay(50);
    } else {
      console.log('Account created success');
    }
  } catch (error) {
    throw new BadRequestException('Có lỗi xảy ra vui lòng thử lại');
  }
}
