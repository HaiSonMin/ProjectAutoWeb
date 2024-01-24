import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { VALUES_CONST } from './constants';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('automation-api');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());

  const config = new DocumentBuilder()
    .addBearerAuth({ type: 'http' }, VALUES_CONST.SWAGGER_TOKEN_NAME)
    .setTitle('Application Automation Scripts')
    .setDescription('API application automation')
    .setVersion('1.0')
    .addTag('App')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);

  await app.listen(9001);
}
bootstrap();
