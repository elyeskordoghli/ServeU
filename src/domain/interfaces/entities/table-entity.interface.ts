import { TableStatus } from 'src/domain/enums';
import { IBaseEntity } from './base-entity.interface';
import { IRestaurantEntity } from './restaurant-entity.interface';

export interface ITableEntity extends IBaseEntity {
  name: string;
  restaurant: IRestaurantEntity;
  status: TableStatus;
}
