import * as os from 'os';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
// import { AuthModule } from '@/features/auth/auth.module';
// import { UserModule } from '@/features/user/user.module';
import { MailModule } from '@/features/scripts/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      cache: true,
    }),
    // MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:27017`, {
    //   connectTimeoutMS: 10000,
    //   dbName: `${process.env.DB_NAME}`,
    //   authSource: 'admin',
    //   // auth: {
    //   //   username: `${process.env.DB_USER}`,
    //   //   password: `${process.env.DB_PASS}`,
    //   // },
    // }),
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('CPU:::', os.cpus());
    console.log('Network:::', os.networkInterfaces());
  }
}
