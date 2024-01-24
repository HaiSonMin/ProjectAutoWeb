import { ERole } from '@/enums';
import { IUser } from '@/interfaces/models/IUser.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User extends IUser {
  @Prop({
    trim: true,
    type: String,
    required: [true, 'Vui lòng bổ sung họ và tên'],
  })
  user_fullName: string;

  @Prop({
    trim: true,
    type: String,
    required: [true, 'Vui lòng bổ sung email'],
    match: [
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      'Email không đúng định dạng',
    ],
    unique: true,
  })
  user_email: string;

  @Prop({ type: String, required: [true, 'Vui lòng bổ sung mật khẩu'] })
  user_password: string;

  @Prop({
    trim: true,
    required: true,
    match: [
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      'Số điện thoại không đúng định dạng',
    ],
    unique: true,
    type: String,
  })
  user_phoneNumber: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  user_isBlocked: boolean;

  @Prop({ type: [mongoose.Schema.ObjectId], default: [] })
  user_clone: string[];

  @Prop({
    type: String,
    enum: ERole,
    default: ERole.USER,
  })
  user_role: string;
}

export const UserModel = SchemaFactory.createForClass(User).index({
  user_email: 'text',
});
