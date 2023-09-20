import { IUserEntity } from '../entities';

export interface ISignInDto {
  email: IUserEntity['email'];
  password: IUserEntity['password'];
}
