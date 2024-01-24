import { IBaseModel } from '@/interfaces/common';

export abstract class IMail extends IBaseModel {
  mail_address: string;
  mail_status: string;
  mail_lastLogin: string;
  mail_password: string;
  mail_socials: string[];
  mail_firstName: string;
  mail_lastName: string;
  mail_description: string;
  mail_user: string;
}

export abstract class IMailRandom {
  password_account: string;
  number_account: number;
}
