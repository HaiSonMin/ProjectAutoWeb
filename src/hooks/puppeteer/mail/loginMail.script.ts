import { delay } from '@/utils';
import puppeteer, { Page } from 'puppeteer';

export async function loginMail(): Promise<Page> {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 5000,
    executablePath: '/usr/bin/chromium-browser',
    ignoreDefaultArgs: [
      '--mute-audio',
      '--enable-automation',
      '--disable-extensions',
    ],
    defaultViewport: null,
    args: ['--start-maximized'],
  });

  // 1. Navigation to server mail
  const page = await browser.newPage();
  await page.goto('https://mail.nikolaxflem.com:7071/zimbraAdmin/', {
    waitUntil: 'load',
  });

  // 2. Login to server mail
  const inputMail = await page.$('#ZLoginUserName');
  await inputMail?.type(process.env.SERVER_MAIL_USER, { delay: 10 });

  const inputPass = await page.$('#ZLoginPassword');
  await inputPass?.type(process.env.SERVER_MAIL_PASS, { delay: 10 });

  await inputPass?.press('Enter');

  await page.waitForFunction(
    () =>
      document.querySelector('#ztabv__HOMEV_output_14___container') !== null,
  );
  await delay(1000);

  return page;
}
