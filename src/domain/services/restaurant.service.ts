import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasswordHashUtil } from 'src/common/utils';
import { RestaurantRepository } from 'src/infrastructure/repositories/restaurant.repository';
import { DeepPartial } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { NotFoundException } from '../exceptions';
import { ICreateRestaurantDto, IUpdateRestaurantDto } from '../interfaces';
import { IRestaurantEntity } from '../interfaces/entities/restaurant-entity.interface';
import { BaseService } from './base.service';
import { UserService } from './user.service';

@Injectable()
export class RestaurantService
  extends BaseService<RestaurantEntity, RestaurantRepository>
  implements OnModuleInit
{
  constructor(
    private readonly passwordHashUtil: PasswordHashUtil,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    repo: RestaurantRepository,
  ) {
    super(repo);
  }

  async onModuleInit() {
    try {
      await this.create(
        {
          name: 'Restaurant',
          email: this.configService.get<string>('RESTAURANT_INIT_EMAIL'),
          password: this.configService.get<string>('RESTAURANT_INIT_PASS'),
          phoneNumber: '00000000',
        },
        true,
      );
    } catch (err) {}
  }

  async create(
    dto: ICreateRestaurantDto,
    isVerified = false,
  ): Promise<IRestaurantEntity> {
    const [mappedEntity] = await Promise.all([
      this.mapDtoToEntity({ ...dto, isVerified }),
      this.userService.validateEmailExistence(dto.email),
    ]);

    const newRestaurant = await this.repo.save(mappedEntity);

    return newRestaurant;
  }

  async update(dto: IUpdateRestaurantDto): Promise<IRestaurantEntity> {
    const foundRestaurant = await this.findOneByOrThrowException({
      id: dto.id,
    });

    const [mappedEntity] = await Promise.all([
      this.mapDtoToEntity(dto),
      this.userService.validateEmailExistence(dto.email, foundRestaurant.id),
    ]);

    const newRestaurant = await this.repo.save({ id: dto.id, ...mappedEntity });

    return newRestaurant;
  }

  async getOne(
    id: IRestaurantEntity['id'],
    withMenuItems?: boolean,
  ): Promise<IRestaurantEntity> {
    const foundRestaurant = await this.repo.findOne({
      where: {
        id,
        isVerified: true,
      },
      relations: withMenuItems
        ? {
            menuItems: true,
          }
        : undefined,
    });

    if (foundRestaurant) {
      return foundRestaurant;
    }

    throw new NotFoundException();
  }

  private async mapDtoToEntity(
    dto: ICreateRestaurantDto,
  ): Promise<DeepPartial<IRestaurantEntity>> {
    const mapped: DeepPartial<IRestaurantEntity> = {
      name: dto.name,
      email: dto.email,
      isVerified: dto.isVerified,
      phoneNumber: dto.phoneNumber,
    };
    if (dto.password) {
      mapped.password = await this.passwordHashUtil.hash(dto.password);
    }
    return mapped;
  }
}
