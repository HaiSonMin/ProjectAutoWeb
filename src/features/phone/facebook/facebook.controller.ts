import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { RemoteOptions, remote } from 'webdriverio';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Phone Facebook')
@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Post()
  @ApiOperation({ summary: 'Create Account Facebook' })
  async createAccount() {
    const capabilities = {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android',
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': '.Settings',
    };

    const wdOpts: RemoteOptions = {
      hostname: process.env.APPIUM_HOST || 'localhost',
      port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
      logLevel: 'info',
      capabilities,
    };

    const driver = await remote(wdOpts);
    try {
      const batteryItem = await driver.$('//*[@text="Battery"]');
      await batteryItem.click();
    } finally {
      await driver.pause(1000);
      await driver.deleteSession();
    }
  }
}
