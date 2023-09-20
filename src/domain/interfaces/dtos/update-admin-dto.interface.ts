import { IUserEntity } from '../entities';
import { ICreateAdminDto } from './create-admin-dto.interface';

export interface IUpdateAdminDto extends ICreateAdminDto {
  id: IUserEntity['id'];
}
