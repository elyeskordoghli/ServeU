import { IUserEntity } from '../interfaces';
import { JwtAuthResponse } from './jwt-auth-response.type';

export type AuthResponse = JwtAuthResponse & {
  user: IUserEntity;
};
