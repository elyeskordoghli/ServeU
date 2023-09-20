import { IRestaurantEntity } from '../entities/restaurant-entity.interface';
import { ICreateRestaurantDto } from './create-restaurant-dto.interface';

export interface IUpdateRestaurantDto extends ICreateRestaurantDto {
  id: IRestaurantEntity['id'];
}
