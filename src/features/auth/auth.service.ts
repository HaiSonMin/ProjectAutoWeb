import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthDtoChangePassword,
  AuthDtoConfirmOtp,
  AuthDtoCreateSessionResetPassword,
  AuthDtoLogin,
  AuthDtoResetPassword,
} from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/model/user.model';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { Request, Response } from 'express';
import {
  comparePassword,
  deleteTokenCookie,
  generatorOTP,
  getMiliSecondFormSecond,
  hashPassword,
  saveTokenCookie,
  verifyToken,
} from '@/utils';
import { VALUES_CONST, htmlResetPassword } from '@/constants';
import { createDoubleKeys, createDoubleTokens } from '@/utils/token';
import { Token } from '../token/model/token.model';
import { ISessionConfirm, ITokenVerify } from '@/interfaces/common';
import { ESession } from '@/enums';
import { sendMail } from '@/helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
  ) {}

  async login(authDtoLogin: AuthDtoLogin, res: Response): Promise<any> {
    const user = await this.userModel.findOne({
      user_email: authDtoLogin.user_email,
    });
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const isMatchingPass = await comparePassword(
      authDtoLogin.user_password,
      user.user_password,
    );

    if (!isMatchingPass) throw new BadRequestException('Mật khẩu không đúng');

    const payload: ITokenVerify = {
      userId: user._id.toString(),
      userRole: user.user_role,
      userEmail: user.user_email,
      userFullName: user.user_fullName,
    };

    const { privateKey, publicKey } = createDoubleKeys();

    const keyStore = await this.tokenModel.findOneAndUpdate(
      {
        token_user: user._id.toString(),
      },
      {
        $set: {
          token_privateKey: privateKey,
          token_publicKey: publicKey,
        },
      },
      { new: true, upsert: true },
    );

    if (!keyStore) {
      throw new BadRequestException('Lỗi hệ thống, vui lòng thử lại!');
    }

    const publicKeyString = crypto.createPublicKey(
      keyStore.token_publicKey.toString(),
    );

    // AT save to Author
    // RT save to DB and Cookie
    /////////////////////// Payload of token ///////////////////////
    const { accessToken, refreshToken } = await createDoubleTokens({
      payload,
      privateKey,
      publicKey: publicKeyString,
    });

    await keyStore.updateOne({
      $set: {
        token_refreshTokenUsing: refreshToken,
      },
    });

    await keyStore.save();
    console.log('VALUES_CONST.RT_NAME:::', VALUES_CONST.RT_NAME);
    console.log('refreshToken::::', refreshToken);

    saveTokenCookie({
      tokenName: VALUES_CONST.RT_NAME,
      tokenValue: refreshToken,
      day: 30,
      res,
      secure: false,
    });

    return {
      user,
      accessToken,
    };
  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies[VALUES_CONST.RT_NAME];
    if (!refreshToken) throw new ForbiddenException('Thao tác thất bại');
    deleteTokenCookie(VALUES_CONST.RT_NAME, res);
    const tokenDeleted = await this.tokenModel
      .findOneAndDelete({
        token_refreshTokenUsing: refreshToken,
      })
      .lean();
    if (!tokenDeleted) return;
    return;
  }

  async createSessionResetPassword(
    { user_email }: AuthDtoCreateSessionResetPassword,
    req: Request,
  ) {
    const user = await this.userModel.findOne({ user_email }).lean().exec();
    if (!user) throw new BadRequestException('Người dùng không tồn tại');
    const session: ISessionConfirm<string> = {
      data: user_email,
      type: ESession.RESET_PASSWORD,
    };

    req.app.locals.session = session;
    return;
  }

  async generateOTP(req: Request) {
    const session = req.app.locals.session as ISessionConfirm<string>;
    console.log('session:::', session);
    if (!session || !session.data) {
      throw new BadRequestException('Lỗi tạo OTP, vui lòng thử lại');
    }

    // Send mail when execute action reset password
    if (session.type === ESession.RESET_PASSWORD) {
      session.otp = await generatorOTP();
      session.duration =
        Date.now() + getMiliSecondFormSecond(VALUES_CONST.TIME_EXPIRED_OTP);
      session.isConfirm = false;
      await sendMail(session.data, htmlResetPassword(session.otp));
    }
    req.app.locals.session = session;

    return;
  }

  async confirmOTP({ otp_code }: AuthDtoConfirmOtp, req: Request) {
    const session = req.app.locals.session as ISessionConfirm<string>;
    console.log('session:::', session);
    // Check otp is correct
    if (!session?.otp || session.otp !== otp_code) {
      throw new BadRequestException(
        'Mã OTP không chính xác, vui lòng thử lại!',
      );
    }
    // Check time expired
    if (!session?.otp || session.duration < Date.now()) {
      throw new BadRequestException(
        'Mã OTP đã hết hạn, vui lòng tạo lại mã mới!',
      );
    }
    session.isConfirm = true;
    req.app.locals.session = session;
    return;
  }

  async resetpassword(
    { user_confirmPassword, user_password }: AuthDtoResetPassword,
    req: Request,
  ) {
    const session = req.app.locals.session as ISessionConfirm<string>;
    if (!session.isConfirm) {
      throw new BadRequestException(
        'Phiên chưa được xác định, vui lòng thử lại',
      );
    }

    if (user_confirmPassword !== user_password) {
      throw new BadRequestException('Mật khẩu xác nhận không đúng');
    }

    const passHashed = await hashPassword(user_password);

    await this.userModel
      .findOneAndUpdate(
        { user_email: session.data },
        { $set: { user_password: passHashed } },
      )
      .lean()
      .exec();

    req.app.locals.session = null;
    return;
  }

  async refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies[VALUES_CONST.RT_NAME];

    if (!refreshToken)
      throw new UnauthorizedException('Vui lòng đăng nhập lại');

    const keyStore = await this.tokenModel
      .findOne({ token_refreshTokenUsing: refreshToken })
      .exec();

    if (!keyStore) throw new UnauthorizedException('Vui lòng đăng nhập lại');
    const { token_privateKey, token_publicKey } = keyStore;

    let tokenVerify: ITokenVerify = {} as ITokenVerify;
    try {
      tokenVerify = verifyToken(refreshToken, token_publicKey);
    } catch (error) {}

    const payload: ITokenVerify = {
      userId: tokenVerify.userId,
      userEmail: tokenVerify.userEmail,
      userFullName: tokenVerify.userFullName,
      userRole: tokenVerify.userRole,
    };

    const publicKeyString = crypto.createPublicKey(token_publicKey);

    const { accessToken: newAT, refreshToken: newRT } =
      await createDoubleTokens({
        payload,
        publicKey: publicKeyString,
        privateKey: token_privateKey,
      });

    // Update refreshToken
    await keyStore.updateOne({
      $set: {
        token_refreshTokenUsing: newRT,
      },
      $addToSet: {
        token_refreshTokenUsed: refreshToken,
      },
    });
    // Save refreshToken to cookie( age: 7day)
    saveTokenCookie({
      tokenName: VALUES_CONST.RT_NAME,
      tokenValue: newRT,
      day: 30,
      res,
    });
    return {
      user: payload,
      newAccessToken: newAT,
    };
  }

  async changePassword(
    {
      user_confirmPassword,
      user_oldPassword,
      user_password,
    }: AuthDtoChangePassword,
    req: Request,
    res: Response,
  ) {
    const user = req['user'] as ITokenVerify;

    const userFind = await this.userModel
      .findOne({
        user_email: user.userEmail,
      })
      .exec();
    if (!userFind) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const isMatchingPass = await comparePassword(
      user_oldPassword,
      userFind.user_password,
    );

    if (!isMatchingPass) {
      throw new BadRequestException('Mật khẩu củ không chính xác');
    }

    if (user_confirmPassword !== user_password) {
      throw new BadRequestException('Mật khẩu xác nhận không chính xác');
    }

    const passHashed = await hashPassword(user_password);

    await userFind.updateOne({ user_password: passHashed });

    deleteTokenCookie(VALUES_CONST.RT_NAME, res);

    return;
  }
}
