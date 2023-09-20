import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IMenuCategoryEntity, IMenuItemEntity } from '../entities';

export interface IGetMenuItemsQueryDto extends IPaginationOptions {
  categoryId?: IMenuCategoryEntity['id'];
  searchKey?: IMenuItemEntity['name'];
}
