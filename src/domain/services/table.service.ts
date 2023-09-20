import { Injectable } from '@nestjs/common';
import { TableRepository } from 'src/infrastructure/repositories/table.repository';
import { DeepPartial } from 'typeorm';
import { TableEntity } from '../entities/table.entity';
import { HttpExceptionMessageKey } from '../enums';
import { BadRequestException } from '../exceptions';
import {
  ICreateTableDto,
  IPaginationOptions,
  ITableEntity,
  IUpdateTableDto,
} from '../interfaces';
import { IRestaurantEntity } from '../interfaces/entities/restaurant-entity.interface';
import { BaseService } from './base.service';

@Injectable()
export class TableService extends BaseService<TableEntity, TableRepository> {
  constructor(repo: TableRepository) {
    super(repo);
  }

  paginate(paginationOptions: IPaginationOptions) {
    return super.findAndPaginate({}, paginationOptions);
  }

  findAll(restaurant: IRestaurantEntity): Promise<ITableEntity[]> {
    return this.repo.find({ where: { restaurant: { id: restaurant.id } } });
  }

  find(
    restaurant: IRestaurantEntity,
    id: ITableEntity['id'],
  ): Promise<ITableEntity> {
    return this.findOneByOrThrowException({
      restaurant: { id: restaurant.id },
      id,
    });
  }

  async create(
    restaurant: IRestaurantEntity,
    dto: ICreateTableDto,
  ): Promise<ITableEntity> {
    const hastTableWithSameOrder =
      (await this.repo.count({
        where: { restaurant: { id: restaurant.id }, name: dto.name },
      })) > 0;

    if (hastTableWithSameOrder) {
      throw new BadRequestException(
        HttpExceptionMessageKey.TABLE_WITH_SAME_NAME_ALREADY_EXISTS,
      );
    }

    return this.createOne({
      restaurant: { id: restaurant.id },
      ...this.mapCreateDtoToEntity(dto),
    });
  }

  update(
    restaurant: IRestaurantEntity,
    dto: IUpdateTableDto,
  ): Promise<ITableEntity> {
    return this.updateOne(
      {
        id: dto.id,
        restaurant: { id: restaurant.id },
      },
      this.mapUpdateDtoToEntity(dto),
    );
  }

  delete(restaurant: IRestaurantEntity, id: string): Promise<ITableEntity> {
    return this.deleteOne({
      restaurant: { id: restaurant.id },
      id,
    });
  }

  private mapCreateDtoToEntity(
    dto: ICreateTableDto,
  ): DeepPartial<ITableEntity> {
    return {
      name: dto.name,
    };
  }

  private mapUpdateDtoToEntity(
    dto: IUpdateTableDto,
  ): DeepPartial<ITableEntity> {
    return {
      ...this.mapCreateDtoToEntity(dto),
      status: dto.status,
    };
  }
}
