import { Injectable } from '@nestjs/common';
import { MenuCategoryRepository } from 'src/infrastructure/repositories/menu-category.repository';
import { DeepPartial } from 'typeorm';
import { MenuCategoryEntity } from '../entities/menu-category.entity';
import {
  ICreateMenuCategoryDto,
  IMenuCategoryEntity,
  IPaginationOptions,
  IUpdateMenuCategoryDto,
} from '../interfaces';
import { BaseService } from './base.service';

@Injectable()
export class MenuCategoryService extends BaseService<
  MenuCategoryEntity,
  MenuCategoryRepository
> {
  constructor(repo: MenuCategoryRepository) {
    super(repo);
  }

  paginate(paginationOptions: IPaginationOptions) {
    return super.findAndPaginate({}, paginationOptions);
  }

  find(id: IMenuCategoryEntity['id']): Promise<IMenuCategoryEntity> {
    return this.findOneByOrThrowException({
      id,
    });
  }

  create(dto: ICreateMenuCategoryDto): Promise<IMenuCategoryEntity> {
    return this.createOne(this.mapDtoToEntity(dto));
  }

  update(dto: IUpdateMenuCategoryDto): Promise<IMenuCategoryEntity> {
    return this.updateOne(
      {
        id: dto.id,
      },
      this.mapDtoToEntity(dto),
    );
  }

  delete(id: IMenuCategoryEntity['id']): Promise<IMenuCategoryEntity> {
    return this.deleteOne({
      id,
    });
  }

  private mapDtoToEntity(
    dto: ICreateMenuCategoryDto,
  ): DeepPartial<IMenuCategoryEntity> {
    return {
      name: dto.name,
    };
  }
}
