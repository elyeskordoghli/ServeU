import { UserRole } from 'src/domain/enums';
import { IBaseEntity } from './base-entity.interface';

export interface IUserEntity extends IBaseEntity {
  name: string;
  role: UserRole;
  email: string;
  password: string;
  isVerified: boolean;
}
