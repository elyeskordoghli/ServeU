import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import backOfficeControllers from './application/back-office/controllers';
import mobileControllers from './application/mobile/controllers';
import webControllers from './application/web/controllers';
import { RequestLoggerMiddleware } from './common/middlewares';
import utils, { isDevLocal } from './common/utils';
import services from './domain/services';
import strategies from './domain/strategies';
import {
  getFormDataModuleConfigs,
  getTypeormModuleConfigs,
} from './infrastructure/configs';
import repositories from './infrastructure/repositories';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeormModuleConfigs,
    }),
    JwtModule.register({}),
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getFormDataModuleConfigs,
    }),
  ],
  controllers: [
    ...webControllers,
    ...backOfficeControllers,
    ...mobileControllers,
  ],
  providers: [...utils, ...repositories, ...services, ...strategies],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (isDevLocal()) {
      consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
  }
}
