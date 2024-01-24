/* eslint-disable @typescript-eslint/no-unused-vars */
import * as crypto from 'crypto';
import * as JWT from 'jsonwebtoken';

export const createDoubleKeys = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
  return { privateKey, publicKey };
};

export const createDoubleTokens = async ({
  payload,
  privateKey,
  publicKey,
}: {
  payload: any;
  privateKey: string;
  publicKey: crypto.KeyObject;
}) => {
  const accessToken = JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d',
  });
  const refreshToken = JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '30d',
  });

  // Check AT have valid
  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
  });

  JWT.verify(refreshToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
  });

  return { accessToken, refreshToken };
};
