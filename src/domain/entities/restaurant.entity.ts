import { ChildEntity, Column, OneToMany } from 'typeorm';
import { EntityColumnName, UserRole } from '../enums';
import { IRestaurantEntity } from '../interfaces/entities/restaurant-entity.interface';
import { MenuItemEntity } from './menu-item.entity';
import { UserEntity } from './user.entity';

@ChildEntity(UserRole.RESTAURANT)
export class RestaurantEntity extends UserEntity implements IRestaurantEntity {
  @Column({ name: EntityColumnName.PHONE_NUMBER })
  phoneNumber: string;

  @OneToMany(() => MenuItemEntity, (menuItem) => menuItem.restaurant)
  menuItems: MenuItemEntity[];
}
