import { IUser } from '@/interfaces/models/IUser.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export abstract class AuthDtoLogin
  implements Pick<IUser, 'user_email' | 'user_password'>
{
  @ApiProperty({ type: String, required: true })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  user_email: string;

  @ApiProperty({ type: String, required: true })
  user_password: string;
}

export abstract class AuthDtoResetPassword
  implements Pick<IUser, 'user_password'>
{
  @ApiProperty({ type: String, required: true })
  user_password: string;

  @ApiProperty({ type: String, required: true })
  user_confirmPassword: string;
}

export abstract class AuthDtoChangePassword
  implements Pick<IUser, 'user_password'>
{
  @ApiProperty({ type: String, required: true })
  user_oldPassword: string;

  @ApiProperty({ type: String, required: true })
  user_password: string;

  @ApiProperty({ type: String, required: true })
  user_confirmPassword: string;
}

export abstract class AuthDtoConfirmOtp {
  @ApiProperty({ type: String, required: true })
  @Length(6, 6, { message: 'Mã OTP phải là 6 số' })
  otp_code: string;
}

export abstract class AuthDtoCreateSessionResetPassword
  implements Pick<IUser, 'user_email'>
{
  @ApiProperty({ type: String, required: true })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  user_email: string;
}
