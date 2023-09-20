import { HttpException } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { HttpExceptionMessageKey } from '../enums';
import { BadRequestException, NotFoundException } from '../exceptions';
import { IBaseEntity, IPaginationOptions } from '../interfaces';
export class BaseService<T extends IBaseEntity, R extends Repository<T>> {
  constructor(protected readonly repo: R) {}

  async findAndPaginate(
    findBy: FindOptionsWhere<T> | FindManyOptions<T>,
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<T>> {
    return paginate(this.repo, paginationOptions, findBy);
  }

  async findOneByOrThrowException(
    findBy: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    exception: HttpException = new NotFoundException(),
  ): Promise<T> {
    const entity = await this.repo.findOneBy(findBy);

    if (entity) {
      return entity;
    }

    throw exception;
  }

  async createOne(toCreate: DeepPartial<T>): Promise<T> {
    try {
      return await this.repo.save(toCreate);
    } catch (err) {
      throw new BadRequestException(HttpExceptionMessageKey.DB_INPUT_ERROR);
    }
  }

  async updateOne(
    findBy: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    toUpdate: DeepPartial<T>,
  ): Promise<T> {
    const entity = await this.findOneByOrThrowException(findBy);
    Object.assign(entity, toUpdate);
    try {
      return await this.repo.save(entity);
    } catch (err) {
      throw new BadRequestException(HttpExceptionMessageKey.DB_INPUT_ERROR);
    }
  }

  async deleteOne(findBy: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
    const entity = await this.findOneByOrThrowException(findBy);
    try {
      return await this.repo.remove(entity);
    } catch (err) {
      throw new BadRequestException(HttpExceptionMessageKey.DB_INPUT_ERROR);
    }
  }
}
