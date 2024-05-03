import * as chrome from 'selenium-webdriver/chrome';
import { Browser, Builder } from 'selenium-webdriver';

// export class DriverSelenium {
//   private static instance: WebDriver;

//   private constructor() {
//     // Private constructor to prevent external instantiation
//   }

//   public static async getInstance(proxyIp?: string) {
//     console.log('First:::', DriverSelenium.instance);
//     if (!DriverSelenium.instance) {
//       const chromeOptions = new chrome.Options()
//         .addArguments('--no-sandbox')
//         .addArguments('--disable-gpu')
//         .addArguments(`--proxy-server=http://${proxyIp}`);
//       // .addArguments(`--proxy-server=socks4://${proxyIp}`);
//       // .addArguments(`--proxy-server=socks5://${proxyIp}`);
//       // .addArguments(`--proxy=socks5://${proxyIp}`);

//       // const capabilities = Capabilities.chrome();
//       // if (proxyIp) {
//       //   const chromeConfig = {
//       //     proxyType: 'manual',
//       //     httpProxy: proxyIp,
//       //     sslProxy: proxyIp,
//       //     socksProxy: proxyIp,
//       //     socksVersion: 4,
//       //   } as ProxyConfig;

//       //   capabilities.set('proxy', chromeConfig);
//       // }

//       DriverSelenium.instance = await new Builder()
//         .forBrowser(Browser.CHROME)
//         .setChromeOptions(chromeOptions)
//         // .withCapabilities(capabilities)
//         .build();
//     }
//   }
// }

export const DriverSelenium = async (proxyIp: string) => {
  const chromeOptions = new chrome.Options()
    .addArguments('--no-sandbox')
    .addArguments('--disable-gpu');
  // .addArguments(`--proxy-server=http://${proxyIp}`);

  return await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(chromeOptions)
    .build();
};
