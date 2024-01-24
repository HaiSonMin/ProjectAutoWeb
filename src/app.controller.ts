import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('automation-api')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
