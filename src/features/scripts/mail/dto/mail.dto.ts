import { ESocial, EStatus } from '@/enums';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IMail, IMailRandom } from '@/interfaces/models';
import { IsEmail, IsEnum, IsNotEmpty, Max, Min } from 'class-validator';

export class MailDtoCreateRandom extends IMailRandom {
  @Expose()
  @Min(1, { message: 'Số lượng lớn hơn hoặc bằng 1' })
  @Max(10000, { message: 'Số lượng nhỏ hơn hoặc bằng 10000' })
  @ApiProperty({ type: Number, required: true, default: 1 })
  number_account: number;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description:
      'Mật khẩu được sử dụng chung cho tất cả account được tạo chung trong 1 phiên',
  })
  password_account: string;
}

export interface MailDtoScratch
  extends Pick<
    IMail,
    | 'mail_address'
    | 'mail_firstName'
    | 'mail_lastName'
    | 'mail_status'
    | 'mail_lastLogin'
    | 'mail_description'
  > {}

export abstract class MailDtoCreate
  implements
    Pick<
      IMail,
      | 'mail_address'
      | 'mail_status'
      | 'mail_firstName'
      | 'mail_lastName'
      | 'mail_password'
      | 'mail_user'
    >
{
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  mail_address: string;

  @Expose()
  @IsEnum(EStatus)
  @ApiProperty({ type: String })
  mail_status: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống trường họ' })
  @ApiProperty({ type: String, required: true })
  mail_firstName: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống trường tên' })
  @ApiProperty({ type: String, required: true })
  mail_lastName: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống trường mật khẩu' })
  @ApiProperty({ type: String, required: true })
  mail_password: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống mã người dùng' })
  @ApiProperty({ type: String, required: true })
  mail_user: string;
}

export abstract class MailDtoUpdate implements Partial<IMail> {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  mail_address: string;

  @Expose()
  @IsEnum(EStatus)
  @ApiProperty({ type: String })
  mail_status: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống trường họ' })
  @ApiProperty({ type: String, required: true })
  mail_firstName: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống trường tên' })
  @ApiProperty({ type: String, required: true })
  mail_lastName: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống trường mật khẩu' })
  @ApiProperty({ type: String, required: true })
  mail_password: string;

  @Expose()
  @IsNotEmpty({ message: 'Không được để trống trường người dùng' })
  @ApiProperty({ type: String, required: true })
  mail_user: string;

  @Expose()
  @ApiProperty({ type: String, required: true })
  mail_description: string;

  @Expose()
  @ApiProperty({ type: String, required: true })
  mail_lastLogin: string;

  @Expose()
  @ApiProperty({ type: [String], enum: ESocial, default: [] })
  mail_socials: string[];
}
