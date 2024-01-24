import { IBaseModel } from '../common';

export abstract class ICloneFB extends IBaseModel {
  clonefb_firstName: string;
  clonefb_lastName: string;
  clonefb_nickname: string;
  clonefb_avatar: string;
  clonefb_pass: string;
  clonefb_2fa: string;
  clonefb_uid: string;
  clonefb_phone: string;
  clonefb_token: string;
  clonefb_cookie: string;
  clonefb_gender: string;
  clonefb_birthday: string;
  clonefb_hometown: string;
  clonefb_userAgent: string;
  clonefb_workplace: string;
  clonefb_currentCity: string;
  clonefb_relationship: string;
  clonefb_university: string;
  clonefb_highschool: string;
  clonefb_juniorHighschool: string;
  clonefb_socialsLink: string[];
  clonefb_language: string[];
  clonefb_friendListIds: string[];
  clonefb_mail: any; // Ref to model mail
}
