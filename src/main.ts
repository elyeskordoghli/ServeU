import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import { FormatResponseInterceptor } from './common/interceptors';
import { InputValidationPipe } from './common/pipes';
import { isNotProduction } from './common/utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.use(requestIp.mw());

  app.enableCors({
    origin: isNotProduction() ? '*' : configService.get<string>('CORS_ORIGIN'),
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new InputValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));

  if (isNotProduction()) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Serve U RestAPI')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
