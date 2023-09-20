import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isDev, isDevLocal } from 'src/common/utils';
import entities from 'src/domain/entities';

export const getTypeormModuleConfigs = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: entities,
  synchronize: isDev(),
  logging: isDevLocal() ? ['migration', 'error'] : ['migration'],
});
