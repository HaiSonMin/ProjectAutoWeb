import { IUser } from '@/interfaces/models/IUser.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export abstract class UserDtoCreate
  implements
    Pick<
      IUser,
      'user_email' | 'user_password' | 'user_fullName' | 'user_phoneNumber'
    >
{
  @ApiProperty({ type: String, required: true })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  user_email: string;

  @ApiProperty({ type: String, required: true })
  @MinLength(6, { message: 'Mât khẩu phải lớn hơn hoặc bằng 6 kí tự' })
  user_password: string;

  @ApiProperty({ type: String, required: true })
  @MinLength(8, { message: 'Họ và tên phải có ít nhất 6 kí tự' })
  user_fullName: string;

  @ApiProperty({ type: String, required: true })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  user_phoneNumber: string;
}

export abstract class UserDtoUpdate implements Partial<IUser> {}
