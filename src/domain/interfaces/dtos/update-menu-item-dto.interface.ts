import { IMenuItemEntity } from '../entities';
import { ICreateMenuItemDto } from './create-menu-item-dto.interface';

export interface IUpdateMenuItemDto extends ICreateMenuItemDto {
  id: IMenuItemEntity['id'];
}
