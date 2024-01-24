import { EGender } from '@/enums';
import { Mail } from '@/features/scripts/mail/model';
import { ICloneFB } from '@/interfaces/models/ICloneFB.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class CloneFB extends ICloneFB {
  @Prop({ type: String, required: [true, 'Vui lòng bổ sung họ'], trim: true })
  clonefb_firstName: string;

  @Prop({ type: String, required: [true, 'Vui lòng bổ sung tên'] })
  clonefb_lastName: string;

  @Prop({ type: String })
  clonefb_nickname: string;

  @Prop({ type: String })
  clonefb_avatar: string;

  @Prop({ type: String, required: [true, 'Vui lòng bổ sung mật khẩu'] })
  clonefb_pass: string;

  @Prop({ type: String })
  clonefb_2fa: string;

  @Prop({ type: String })
  clonefb_uid: string;

  @Prop({
    type: String,
    enum: EGender,
    required: [true, 'Vui lòng bổ sung giới tính'],
  })
  clonefb_gender: string;

  @Prop({
    trim: true,
    required: true,
    match: [
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      'Số điện thoại không đúng định dạng',
    ],
    unique: true,
  })
  clonefb_phone: string;

  @Prop({ type: String })
  clonefb_token: string;

  @Prop({ type: String })
  clonefb_cookie: string;

  @Prop({ type: String, required: [true, 'Vui lòng bổ sung ngày sinh'] })
  clonefb_birthday: string;

  @Prop({ type: String })
  clonefb_userAgent: string;

  @Prop({ type: String })
  clonefb_hometown: string;

  @Prop({ type: String })
  clonefb_currentCity: string;

  @Prop({ type: String })
  clonefb_relationship: string;

  @Prop({ type: String })
  clonefb_workplace: string;

  @Prop({ type: String })
  clonefb_university: string;

  @Prop({ type: String })
  clonefb_highschool: string;

  @Prop({ type: String })
  clonefb_juniorHighschool: string;

  @Prop({ type: [String] })
  clonefb_socialsLink: string[];

  @Prop({ type: [String] })
  clonefb_language: string[];

  @Prop()
  clonefb_friendListIds: string[];

  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: Mail.name,
    required: [true, 'Vui lòng bổ sung email'],
  })
  clonefb_mail: Mail; // Ref to model mail
}

export const CloneFBModel = SchemaFactory.createForClass(CloneFB);
