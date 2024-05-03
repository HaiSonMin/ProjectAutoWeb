import { latinizeStr, randomName } from '@/utils';
import {
  createAccountEmailSelenium,
  loginMailSelenium,
} from '@/hooks/selenium/mail';
import { EStatus } from '@/enums';
import { Injectable } from '@nestjs/common';
import { MailDtoCreate, MailDtoCreateRandom } from './dto';
import { LIST_OF_FIRST_NAME, LIST_OF_LAST_NAME } from '@/constants';
import { DriverSelenium } from '@/core';
import { PROXY_IPS } from '@/hooks/proxy-ips';

@Injectable()
export class MailService {
  constructor() {}

  async createAccountsRandom(mailDtoCreateRandom: MailDtoCreateRandom) {
    const listMailsCreated: MailDtoCreate[] = [];

    while (listMailsCreated.length < mailDtoCreateRandom.number_account) {
      const randomFName = randomName(LIST_OF_FIRST_NAME);
      const randomLName = randomName(LIST_OF_LAST_NAME);

      const randomMail = latinizeStr(
        `${randomFName + randomLName}${Math.floor(Math.random() * 10000)}`,
      );

      const newMail: MailDtoCreate = {
        mail_address: `${randomMail}@nikolaxflem.com`,
        mail_firstName: randomFName,
        mail_lastName: randomLName,
        mail_password: mailDtoCreateRandom.password_account,
        mail_status: EStatus.SPENDING,
        mail_creator: mailDtoCreateRandom.creator,
      };

      listMailsCreated.push(newMail);

      // const newMail = await this.mailModel.create(newAccount);
      // listMailsCreated.push(newMail);
    }

    const driver = await DriverSelenium(PROXY_IPS[0]);

    const dataLoginMail: Pick<
      MailDtoCreateRandom,
      'mail_address' | 'mail_password'
    > = {
      mail_address: mailDtoCreateRandom.mail_address,
      mail_password: mailDtoCreateRandom.mail_password,
    };

    await loginMailSelenium(driver, dataLoginMail);

    for (const mail of listMailsCreated) {
      await createAccountEmailSelenium(driver, mail);
    }

    return {
      totalItems: listMailsCreated.length,
      items: listMailsCreated,
    };
  }

  // async createAccountsSpendingToServerMail({
  //   number_account,
  // }: Pick<MailDtoCreateRandom, 'number_account'>): Promise<
  //   IGetManyItem<IMail>
  // > {
  //   const driver = await DriverSelenium(PROXY_IPS[0]);
  //   // const mailsSpending = await this.mailModel
  //   //   .find({
  //   //     mail_status: EStatus.SPENDING,
  //   //   })
  //   //   .limit(number_account)
  //   //   .lean()
  //   //   .exec();

  //   await loginMailSelenium(driver);

  //   await delay(1000);

  //   const listMailUpdated = [];
  //   for (const mail of mailsSpending) {
  //     // await createAccountScript(page, mail);
  //     await createAccountEmailSelenium(driver, mail);

  //     // const mailUpdated = await this.mailModel
  //     //   .findByIdAndUpdate(
  //     //     mail._id,
  //     //     {
  //     //       $set: { mail_status: EStatus.ACTIVE },
  //     //     },
  //     //     { new: true },
  //     //   )
  //     //   .lean()
  //     //   .exec();

  //     // listMailUpdated.push(mailUpdated);

  //     await delay(100);
  //   }
  //   await delay(1000);
  //   // await driver.quit();

  //   return {
  //     totalItems: listMailUpdated.length,
  //     items: listMailUpdated,
  //   };
  // }

  // async scratchAccounts(): Promise<IGetManyItem<IMail>> {
  //   // const itemsAccountsScratched =
  //   //   (await scratchMailAccountScript()) as IMail[];

  //   const itemsAccountsScratched =
  //     (await scratchMailAccountSelenium()) as IMail[];

  //   const listNewEmails = await Promise.all(
  //     itemsAccountsScratched.map(async (item) => {
  //       const newMail = await this.mailModel.findOneAndUpdate(
  //         { mail_address: item.mail_address },
  //         item,
  //         { new: true, upsert: true },
  //       );
  //       return newMail;
  //     }),
  //   );

  //   return {
  //     totalItems: listNewEmails.length,
  //     items: listNewEmails,
  //   };
  // }

  // async search(query: IQuery): Promise<IGetManyItem<IMail>> {
  //   const [items, totalItems] = await Promise.all([
  //     this.mailModel
  //       .find({ mail_status: query.status })
  //       .select(selectFields(query.fields))
  //       .skip(skipPage({ limit: query.limit, page: query.page }))
  //       .limit(query.limit)
  //       .lean()
  //       .exec(),
  //     this.mailModel.countDocuments({ mail_status: query.status }),
  //   ]);
  //   return { items, totalItems };
  // }

  // async getAll(query: IQuery): Promise<IGetManyItem<IMail>> {
  //   const [items, totalItems] = await Promise.all([
  //     this.mailModel
  //       .find({ mail_status: query.status })
  //       .select(selectFields(query.fields))
  //       .skip(skipPage({ limit: query.limit, page: query.page }))
  //       .limit(query.limit)
  //       .lean()
  //       .exec(),
  //     this.mailModel.countDocuments({ mail_status: query.status }),
  //   ]);
  //   return { items, totalItems };
  // }

  // async getById(id: string): Promise<IMail> {
  //   const email = await this.mailModel.findById(id).lean().exec();
  //   if (!email) throw new BadRequestException('Email không tồn tại');
  //   return email;
  // }

  // async updateByMail(
  //   mail_address: string,
  //   mailDtoUpdate: MailDtoUpdate,
  // ): Promise<IMail> {
  //   const mailUpdated = await this.mailModel.findOneAndUpdate(
  //     { mail_address },
  //     mailDtoUpdate,
  //     { new: true },
  //   );

  //   if (!mailUpdated) throw new BadRequestException('Email không tồn tại');
  //   return mailUpdated;
  // }

  // async deleteByMail(mail_address: string): Promise<IMail> {
  //   const mailDeleted = await this.mailModel
  //     .findOneAndDelete({ mail_address })
  //     .lean()
  //     .exec();
  //   if (!mailDeleted) throw new BadRequestException('Email không tồn tại');
  //   return mailDeleted;
  // }

  // async deleteAllMailSpending(): Promise<any> {
  //   await this.mailModel
  //     .deleteMany({ mail_status: EStatus.SPENDING })
  //     .lean()
  //     .exec();
  //   return;
  // }
}
