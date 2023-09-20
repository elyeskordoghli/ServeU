import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import {
  EntityColumnName,
  EntityIndexName,
  EntityName,
  TableStatus,
} from '../enums';
import { ITableEntity } from '../interfaces';
import { BaseEntity } from './base.entity';
import { RestaurantEntity } from './restaurant.entity';

@Entity(EntityName.TABLE)
@Unique(EntityIndexName.UNIQUE_RESTAURANT_TABLE, [
  EntityColumnName.RESTAURANT,
  EntityColumnName.NAME,
])
export class TableEntity extends BaseEntity implements ITableEntity {
  @Column({ name: EntityColumnName.NAME })
  name: string;

  @ManyToOne(() => RestaurantEntity, {
    nullable: false,
  })
  @JoinColumn({ name: EntityColumnName.RESTAURANT_ID })
  restaurant: RestaurantEntity;

  @Column({ name: EntityColumnName.STATUS, default: TableStatus.FREE })
  status: TableStatus;
}
