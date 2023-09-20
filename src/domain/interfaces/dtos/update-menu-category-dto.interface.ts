import { IMenuCategoryEntity } from '../entities';
import { ICreateMenuCategoryDto } from './create-menu-category-dto.interface';

export interface IUpdateMenuCategoryDto extends ICreateMenuCategoryDto {
  id: IMenuCategoryEntity['id'];
}
