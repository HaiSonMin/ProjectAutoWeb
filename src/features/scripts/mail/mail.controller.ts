import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  PickType,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';
import { DriverSelenium, ResponseCreate } from '@/core';
import { AuthGuard } from '../../auth/guards';
import { VALUES_CONST } from '@/constants';
import { IMail } from '@/interfaces/models';
import { MailService } from './mail.service';
import { MailDtoCreate, MailDtoCreateRandom, MailDtoUpdate } from './dto';
import { IBaseResponse, IGetManyItem, IQuery } from '@/interfaces/common';
import { PROXY_IPS } from '@/hooks/proxy-ips';
import { delay } from '@/utils';

@ApiTags('Mail Apis')
@Controller('mails')
export class MailController {
  constructor(private mailService: MailService) {}
  @Post('/test-proxy')
  async testProxy(): Promise<any> {
    const driver = await DriverSelenium(PROXY_IPS[80]);
    await driver.get('https://checkip.com.vn/');
    await delay(1000);
    await driver.quit();
  }

  @Post('/create-random-accounts')
  @ApiOperation({
    summary: 'Tạo ngẫu nhiên tài khoản',
    description:
      'Tạo tài khoản ngẫu nhiên với đầu vào là mật khẩu và số tài khoản muốn tạo',
  })
  @ApiBody({ type: MailDtoCreateRandom })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(VALUES_CONST.SWAGGER_TOKEN_NAME)
  async createAccountsRandom(
    @Body() mailDtoCreateRandom: MailDtoCreateRandom,
    @Req() req: Request,
  ): Promise<any> {
    return new ResponseCreate({
      message: 'Tạo ngẫu nhiên tài khoảng mail thành công',
      metadata: await this.mailService.createAccountsRandom(
        mailDtoCreateRandom,
        req,
      ),
    });
  }

  @Post('/create-accounts-spending')
  @ApiOperation({
    summary: 'Tạo các tài khoản đang chờ',
    description:
      'Tạo các tài khoản đang chờ trong database(Chưa được tạo ở server mail)',
  })
  @ApiBody({
    type: PickType(MailDtoCreateRandom, ['number_account']),
  })
  async createAccountsSpendingToServerMail(
    @Body() payload: Pick<MailDtoCreateRandom, 'number_account'>,
  ): Promise<any> {
    return new ResponseCreate({
      message: 'Tạo tài khoảng email đang chờ vào server mail thành công',
      metadata: await this.mailService.createAccountsSpendingToServerMail({
        number_account: payload.number_account,
      }),
    });
  }

  @Get('/scratch-accounts')
  @ApiOperation({
    summary: 'Scratch all accounts',
    description:
      'Scratch all accounts from server mail and save all to database',
  })
  async scratchAccounts(): Promise<IBaseResponse<IGetManyItem<IMail>>> {
    return new ResponseCreate({
      message: 'Scratch dữ liệu vào lưu vào database thành công',
      metadata: await this.mailService.scratchAccounts(),
    });
  }

  @Get('')
  @ApiOperation({
    summary: 'Lấy tất cả email trong database',
  })
  async getAll(
    @Query() query: IQuery,
  ): Promise<IBaseResponse<IGetManyItem<IMail>>> {
    return new ResponseCreate({
      message: 'Lấy tất cả dữ liệu mail thành công',
      metadata: await this.mailService.getAll(query),
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy email theo id',
  })
  async getById(@Param('id') id: string): Promise<IBaseResponse<IMail>> {
    return new ResponseCreate({
      message: 'Lấy dữ liệu mail thành công',
      metadata: await this.mailService.getById(id),
    });
  }

  @Patch('/:mail')
  @ApiOperation({
    summary: 'Update by mail address',
    description: 'Update info of email by mail address and update to database',
  })
  async updateByMail(
    @Param('mail') { mail_address }: Pick<MailDtoUpdate, 'mail_address'>,
    @Body() mailDtoUpdate: MailDtoUpdate,
  ): Promise<IBaseResponse<IMail>> {
    return new ResponseCreate({
      message: 'Cập nhật thông tin mail thành công',
      metadata: await this.mailService.updateByMail(
        mail_address,
        mailDtoUpdate,
      ),
    });
  }

  @Delete('/:mail')
  @ApiOperation({
    summary: 'Delete by mail address',
    description: 'Delete info of email by mail address and delete in database',
  })
  async deleteByMail(
    @Param('mail') { mail_address }: Pick<MailDtoCreate, 'mail_address'>,
  ): Promise<IBaseResponse<IMail>> {
    return new ResponseCreate({
      message: 'Xóa mail thành công',
      metadata: await this.mailService.deleteByMail(mail_address),
    });
  }

  @Delete('/spending')
  @ApiOperation({
    summary: 'Xóa tất cả mail đang chờ',
    description: 'Xóa tất cả các mail đang có trạng thái spending',
  })
  async deleteAllSpending(): Promise<IBaseResponse<IMail>> {
    return new ResponseCreate({
      message: 'Xóa tất cả mails spending thành công',
      metadata: await this.mailService.deleteAllMailSpending(),
    });
  }
}
