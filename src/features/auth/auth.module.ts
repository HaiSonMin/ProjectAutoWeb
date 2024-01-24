import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from '../user/model/user.model';
import { Token, TokenModel } from '../token/model/token.model';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel },
      { name: Token.name, schema: TokenModel },
    ]),
  ],
})
export class AuthModule {}
