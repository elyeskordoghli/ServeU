import { IMenuItemEntity } from './menu-item-entity.interface';
import { IUserEntity } from './user-entity.interface';

export interface IRestaurantEntity extends IUserEntity {
  phoneNumber: string;
  menuItems: IMenuItemEntity[];
}
