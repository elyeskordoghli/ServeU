import { IBaseEntity } from './base-entity.interface';
import { IMenuItemEntity } from './menu-item-entity.interface';

export interface IMenuCategoryEntity extends IBaseEntity {
  name: string;
  menuItems: IMenuItemEntity[];
}
