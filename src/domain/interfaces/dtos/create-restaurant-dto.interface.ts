import { IRestaurantEntity } from '../entities/restaurant-entity.interface';

export interface ICreateRestaurantDto {
  name: IRestaurantEntity['name'];
  email: IRestaurantEntity['email'];
  phoneNumber: IRestaurantEntity['phoneNumber'];
  password: IRestaurantEntity['password'];
  isVerified?: IRestaurantEntity['isVerified'];
}
