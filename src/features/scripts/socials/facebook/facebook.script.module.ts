import { Module } from '@nestjs/common';
import { FacebookScriptController } from './facebook.script.controller';
import { FacebookScriptService } from './facebook.script.service';

@Module({
  providers: [FacebookScriptService],
  controllers: [FacebookScriptController],
  imports: [],
})
export class FacebookScriptModule {}
