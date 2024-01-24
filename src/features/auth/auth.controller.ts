import {
  AuthDtoChangePassword,
  AuthDtoConfirmOtp,
  AuthDtoCreateSessionResetPassword,
  AuthDtoLogin,
  AuthDtoResetPassword,
} from './dto';
import { ResponseOk } from '@/core';
import { VALUES_CONST } from '@/constants';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Post, Body, Controller, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards';

@ApiTags('Auth Apis')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập',
    description: 'Đăng nhập bằng email và mật khẩu',
  })
  async login(@Body() authDtoLogin: AuthDtoLogin, @Res() res: Response) {
    return new ResponseOk({
      message: 'Đăng nhập thành công',
      metadata: await this.authService.login(authDtoLogin, res),
    }).send(res);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Đăng xuất' })
  @ApiBearerAuth(VALUES_CONST.SWAGGER_TOKEN_NAME)
  async logout(@Req() req: Request, @Res() res: Response) {
    return new ResponseOk({
      message: 'Đăng xuất thành công',
      metadata: await this.authService.logout(req, res),
    }).send(res);
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh Token',
    description: 'Thực hiện khi access token hết hạn',
  })
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return new ResponseOk({
      message: 'Refresh token thành công',
      metadata: await this.authService.refreshAccessToken(req, res),
    }).send(res);
  }

  @Post('create-session-reset-pass')
  @ApiOperation({
    summary: 'Tạo phiên đặt lại mật khẩu',
    description: 'Tạo phiên đặt lại mật khẩu khi người dùng nhập vào email',
  })
  async createSessionResetPassword(
    @Body()
    authDtoCreateSessionResetPassword: AuthDtoCreateSessionResetPassword,
    @Req() req: Request,
  ) {
    return new ResponseOk({
      message: 'Tạo phiên đặt lại mật khẩu thành công',
      metadata: await this.authService.createSessionResetPassword(
        authDtoCreateSessionResetPassword,
        req,
      ),
    });
  }

  @Post('generate-otp')
  @ApiOperation({
    summary: 'Tạo OTP',
    description:
      'Tạo OTP cho hành động reset password hoặc những hành động yêu cầu việc xác nhận qua email',
  })
  async generateOTP(@Req() req: Request) {
    return new ResponseOk({
      message: 'Tạo OTP thành công',
      metadata: await this.authService.generateOTP(req),
    });
  }

  @Post('confirm-otp')
  @ApiOperation({
    summary: 'Xác nhận OTP',
    description: 'Kiểm tra mã OTP được gửi qua email ',
  })
  async confirmOTP(
    @Body() authDtoConfirmOtp: AuthDtoConfirmOtp,
    @Req() req: Request,
  ) {
    return new ResponseOk({
      message: 'Xác thực OTP thành công',
      metadata: await this.authService.confirmOTP(authDtoConfirmOtp, req),
    });
  }

  @Post('reset-pass')
  @ApiOperation({
    summary: 'Đặt lại mật khẩu',
  })
  async resetpassword(
    @Body() authDtoResetPassword: AuthDtoResetPassword,
    @Req() req: Request,
  ) {
    return new ResponseOk({
      message: 'Đặt lại mật khẩu thành công',
      metadata: await this.authService.resetpassword(authDtoResetPassword, req),
    });
  }

  @Post('change-pass')
  @ApiOperation({
    summary: 'Thay đổi mật khẩu',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(VALUES_CONST.SWAGGER_TOKEN_NAME)
  async changePassword(
    @Body() authDtoChangePassword: AuthDtoChangePassword,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return new ResponseOk({
      message: 'Thay đổi mật khẩu thành công',
      metadata: await this.authService.changePassword(
        authDtoChangePassword,
        req,
        res,
      ),
    }).send(res);
  }
}
