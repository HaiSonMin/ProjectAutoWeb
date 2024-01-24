import { Module } from '@nestjs/common';
import { CloneFBService } from './clonefb.service';
import { CloneFBController } from './clonefb.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloneFB, CloneFBModel } from './model';
import { Mail, MailModel } from '../scripts/mail/model';

@Module({
  imports: [
    MongooseModule.forFeature([
      ,
      { name: CloneFB.name, schema: CloneFBModel },
      { name: Mail.name, schema: MailModel },
    ]),
  ],
  controllers: [CloneFBController],
  providers: [CloneFBService],
})
export class CloneFBModule {}
