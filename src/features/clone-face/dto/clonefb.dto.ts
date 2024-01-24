import { EGender } from '@/enums';
import { ICloneFB } from '@/interfaces/models/ICloneFB.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import * as mongoose from 'mongoose';

// export abstract class CloneFBDto implements ICloneFB {
//   @Expose()
//   @IsNotEmpty({ message: 'Vui lòng bổ sung họ' })
//   @ApiProperty({ type: String, required: true })
//   clonefb_firstName: string;

//   @Expose()
//   @IsNotEmpty({ message: 'Vui lòng bổ sung tên' })
//   @ApiProperty({ type: String, required: true })
//   clonefb_lastName: string;

//   @Expose()
//   @IsNotEmpty({ message: 'Vui lòng bổ sung mật khẩu' })
//   @MinLength(6, { message: 'Mật khẩu phải hơn 6 kí tự' })
//   @ApiProperty({ type: String, required: true })
//   clonefb_pass: string;

//   @Expose()
//   @IsNotEmpty({ message: 'Vui lòng bổ sung giới tính' })
//   @IsEnum(EGender, { message: 'Giới tính không đúng định dạng' })
//   @ApiProperty({ type: String, enum: EGender, required: true })
//   clonefb_gender: string;

//   @Expose()
//   @IsNotEmpty({ message: 'Vui lòng bổ sung số điện thoại' })
//   @ApiProperty({ type: String, required: true })
//   @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
//   clonefb_phone: string;

//   @Expose()
//   @IsNotEmpty({ message: 'Vui lòng bổ sung ngày tháng năm sinh' })
//   @ApiProperty({ type: String, required: true })
//   clonefb_birthday: string;

//   @Expose()
//   @IsNotEmpty({ message: 'Vui lòng bổ sung mail' })
//   @ApiProperty({ type: mongoose.Schema.ObjectId, required: true })
//   clonefb_mail: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_2fa: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_avatar: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_cookie: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_currentCity: string;

//   @Expose()
//   @ApiProperty({ type: [String] })
//   clonefb_friendListIds: string[];

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_highschool: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_hometown: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_juniorHighschool: string;

//   @Expose()
//   @ApiProperty({ type: [String] })
//   clonefb_language: string[];

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_nickname: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_relationship: string;

//   @Expose()
//   @ApiProperty({ type: [String] })
//   clonefb_socialsLink: string[];

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_token: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_uid: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_university: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_userAgent: string;

//   @Expose()
//   @ApiProperty({ type: String })
//   clonefb_workplace: string;
// }

export abstract class CloneFbDtoCreate
  implements
    Pick<
      ICloneFB,
      | 'clonefb_firstName'
      | 'clonefb_lastName'
      | 'clonefb_pass'
      | 'clonefb_gender'
      | 'clonefb_phone'
      | 'clonefb_birthday'
      | 'clonefb_mail'
    >
{
  @Expose()
  @IsNotEmpty({ message: 'Vui lòng bổ sung họ' })
  @ApiProperty({ type: String, required: true })
  clonefb_firstName: string;

  @Expose()
  @IsNotEmpty({ message: 'Vui lòng bổ sung tên' })
  @ApiProperty({ type: String, required: true })
  clonefb_lastName: string;

  @Expose()
  @IsNotEmpty({ message: 'Vui lòng bổ sung mật khẩu' })
  @MinLength(6, { message: 'Mật khẩu phải hơn 6 kí tự' })
  @ApiProperty({ type: String, required: true })
  clonefb_pass: string;

  @Expose()
  @IsNotEmpty({ message: 'Vui lòng bổ sung giới tính' })
  @IsEnum(EGender, { message: 'Giới tính không đúng định dạng' })
  @ApiProperty({ type: String, enum: EGender, required: true })
  clonefb_gender: string;

  @Expose()
  @IsNotEmpty({ message: 'Vui lòng bổ sung số điện thoại' })
  @ApiProperty({ type: String, required: true })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  clonefb_phone: string;

  @Expose()
  @IsNotEmpty({ message: 'Vui lòng bổ sung ngày tháng năm sinh' })
  @ApiProperty({ type: String, required: true })
  clonefb_birthday: string;

  @Expose()
  @IsNotEmpty({ message: 'Vui lòng bổ sung mail' })
  @ApiProperty({ type: mongoose.Schema.ObjectId, required: true })
  clonefb_mail: string;
}

export abstract class CloneFBDtoUpdate implements Partial<ICloneFB> {}
