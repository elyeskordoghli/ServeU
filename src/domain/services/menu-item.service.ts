import { Injectable } from '@nestjs/common';
import { GetMenuItemsQueryDto } from 'src/application/web/dtos/get-menu-items-query.dto';
import { MenuItemRepository } from 'src/infrastructure/repositories/menu-item.repository';
import { DeepPartial, ILike } from 'typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { IMenuItemEntity, IUpdateMenuItemDto } from '../interfaces';
import { ICreateMenuItemDto } from '../interfaces/dtos/create-menu-item-dto.interface';
import { IRestaurantEntity } from '../interfaces/entities/restaurant-entity.interface';
import { BaseService } from './base.service';

@Injectable()
export class MenuItemService extends BaseService<
  MenuItemEntity,
  MenuItemRepository
> {
  constructor(repo: MenuItemRepository) {
    super(repo);
  }

  paginate(restaurant: IRestaurantEntity, dto: GetMenuItemsQueryDto) {
    return this.findAndPaginate(
      {
        where: {
          restaurant: { id: restaurant.id },
          category: dto.categoryId && { id: dto.categoryId },
          name: dto.searchKey ? ILike(`%${dto.searchKey}%`) : undefined,
        },
      },
      {
        page: dto.page,
        limit: dto.limit,
      },
    );
  }

  find(restaurant: IRestaurantEntity, id: string): Promise<IMenuItemEntity> {
    return this.findOneByOrThrowException({
      id,
      restaurant: {
        id: restaurant.id,
      },
    });
  }

  create(
    restaurant: IRestaurantEntity,
    dto: ICreateMenuItemDto,
  ): Promise<IMenuItemEntity> {
    return this.createOne({
      restaurant: { id: restaurant.id },
      ...this.mapDtoToEntity(dto),
    });
  }

  update(
    restaurant: IRestaurantEntity,
    dto: IUpdateMenuItemDto,
  ): Promise<IMenuItemEntity> {
    return this.updateOne(
      {
        id: dto.id,
        restaurant: {
          id: restaurant.id,
        },
      },
      this.mapDtoToEntity(dto),
    );
  }

  delete(restaurant: IRestaurantEntity, id: string): Promise<IMenuItemEntity> {
    return this.deleteOne({
      id,
      restaurant: {
        id: restaurant.id,
      },
    });
  }

  private mapDtoToEntity(
    dto: ICreateMenuItemDto,
  ): DeepPartial<IMenuItemEntity> {
    return {
      category: { id: dto.categoryId },
      image: { id: dto.imageId },
      name: dto.name,
      price: dto.price,
    };
  }
}
