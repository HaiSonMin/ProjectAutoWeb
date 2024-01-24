import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenModel } from './model/token.model';

@Module({
  providers: [TokenService],
  controllers: [TokenController],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenModel }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenModel }]),
  ],
})
@Global()
export class TokenModule {}
