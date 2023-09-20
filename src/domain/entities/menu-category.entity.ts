import { Column, Entity, OneToMany } from 'typeorm';
import { EntityColumnName, EntityName } from '../enums';
import { IMenuCategoryEntity } from '../interfaces';
import { BaseEntity } from './base.entity';
import { MenuItemEntity } from './menu-item.entity';

@Entity(EntityName.MENU_CATEGORY)
export class MenuCategoryEntity
  extends BaseEntity
  implements IMenuCategoryEntity
{
  @Column({ name: EntityColumnName.NAME })
  name: string;

  @OneToMany(() => MenuItemEntity, (menuItem) => menuItem.category)
  menuItems: MenuItemEntity[];
}
