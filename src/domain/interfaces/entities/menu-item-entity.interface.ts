import { IBaseEntity } from './base-entity.interface';
import { IFileEntity } from './file-entity.interface';
import { IMenuCategoryEntity } from './menu-category-entity.interface';
import { IRestaurantEntity } from './restaurant-entity.interface';

export interface IMenuItemEntity extends IBaseEntity {
  name: string;
  image: IFileEntity;
  price: number;
  category: IMenuCategoryEntity;
  restaurant: IRestaurantEntity;
}
