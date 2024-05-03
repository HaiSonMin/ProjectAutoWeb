import { ESocial } from '@/enums';
import { IMail } from '@/interfaces/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Mail extends IMail {
  @Prop({
    type: String,
    trim: true,
    required: true,
    match: [
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      'Email không đúng định dạng',
    ],
    unique: true,
  })
  mail_address: string;

  @Prop({ type: String, require: true })
  mail_lastName: string;

  @Prop({ type: String, require: true })
  mail_firstName: string;

  @Prop({ type: String, required: true })
  mail_password: string;

  @Prop({ type: String, required: true })
  mail_status: string;

  @Prop({ type: String })
  mail_lastLogin: string;

  @Prop({ type: [String], enum: ESocial, default: [] })
  mail_socials: string[];

  @Prop({ type: String })
  mail_description: string;
}

export const MailModel = SchemaFactory.createForClass(Mail).index({
  mail_address: 'text',
});
