import * as lodash from 'lodash';
import * as unorm from 'unorm';
import * as otpGenerator from 'otp-generator';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import { VALUES_CONST } from '@/constants';
import { ITokenVerify } from '@/interfaces/common';
export const getInfoData = (object: any, field: Array<string>) =>
  lodash.pick(object, field);

export const skipPage = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): number => (+page - 1) * +limit;

export function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export const selectFields = (fields: string) => {
  if (!fields) return '';
  return fields.split(',').map((field) => field.trim());
};

export function randomName(listName: string[]): string {
  return listName[Math.floor(Math.random() * listName.length)];
}

export const saveTokenCookie = ({
  tokenName,
  tokenValue,
  secure = false,
  day,
  res,
}: {
  tokenName: string;
  tokenValue: any;
  secure?: boolean;
  day: number;
  res: Response;
}) =>
  res.cookie(tokenName, tokenValue, {
    secure: secure,
    httpOnly: true,
    maxAge: day * 24 * 60 * 60 * 1000,
  });

export const deleteTokenCookie = (tokenName: string, res: Response) =>
  res.clearCookie(tokenName, {
    httpOnly: true,
  });

export const latinizeStr = (str: string): string => {
  // "Đông Dũng" => dongdung
  return unorm
    .nfkd(str)
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(VALUES_CONST.SALT);
  const passHash = await bcrypt.hash(password, salt);
  return passHash;
};

export const comparePassword = async (
  passInput: string,
  passHashed: string,
) => {
  const isMatchingPass = await bcrypt.compare(passInput, passHashed);
  return isMatchingPass;
};

export const generatorOTP = async () =>
  otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

export const getMiliSecondFormSecond = (second: number) => second * 1000;

export const verifyToken = (token: string, key: string): ITokenVerify | null =>
  JWT.verify(token, key) as ITokenVerify;
