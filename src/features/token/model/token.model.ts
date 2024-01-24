import { User } from '@/features/user/model';
import { IToken } from '@/interfaces/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Token extends IToken {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User.name, required: true })
  token_user: string;

  @Prop({ type: String, required: true })
  token_privateKey: string;

  @Prop({ type: String, required: true })
  token_publicKey: string;

  @Prop({ type: [String], default: [] })
  token_refreshTokenUsed: string[];

  @Prop({ type: String })
  token_refreshTokenUsing: string;
}

export const TokenModel = SchemaFactory.createForClass(Token);
