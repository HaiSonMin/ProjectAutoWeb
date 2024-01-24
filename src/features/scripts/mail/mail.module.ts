import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mail, MailModel } from './model';
import { TokenModule } from '../../token/token.module';

@Module({
  providers: [MailService],
  controllers: [MailController],
  imports: [
    MongooseModule.forFeature([{ name: Mail.name, schema: MailModel }]),
    TokenModule,
  ],
})
export class MailModule {}
