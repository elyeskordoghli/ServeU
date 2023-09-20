import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { EntityColumnName, EntityName } from '../enums';
import { IMenuItemEntity } from '../interfaces';
import { BaseEntity } from './base.entity';
import { FileEntity } from './file.entity';
import { MenuCategoryEntity } from './menu-category.entity';
import { RestaurantEntity } from './restaurant.entity';

@Entity(EntityName.MENU_ITEM)
export class MenuItemEntity extends BaseEntity implements IMenuItemEntity {
  @Column({ name: EntityColumnName.NAME })
  name: string;

  @Column({ name: EntityColumnName.PRICE, type: 'float' })
  price: number;

  @OneToOne(() => FileEntity, {
    nullable: false,
    eager: true,
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn({ name: EntityColumnName.IMAGE_ID })
  image: FileEntity;

  @ManyToOne(() => MenuCategoryEntity, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({
    name: EntityColumnName.CATEGORY_ID,
  })
  category: MenuCategoryEntity;

  @ManyToOne(() => RestaurantEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: EntityColumnName.RESTAURANT_ID,
  })
  restaurant: RestaurantEntity;
}
