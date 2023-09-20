import { IUserEntity } from '../entities';

export interface ICreateAdminDto {
  name: IUserEntity['name'];
  email: IUserEntity['email'];
  password: IUserEntity['password'];
  isVerified: IUserEntity['isVerified'];
}
