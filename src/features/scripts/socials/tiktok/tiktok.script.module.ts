import { Module } from '@nestjs/common';
import { TiktokScriptController } from './tiktok.script.controller';
import { TiktokScriptService } from './tiktok.script.service';

@Module({
  imports: [],
  controllers: [TiktokScriptController],
  providers: [TiktokScriptService],
})
export class TiktokScriptModule {}
