import { IFileEntity, IMenuCategoryEntity, IMenuItemEntity } from '../entities';

export interface ICreateMenuItemDto {
  name: IMenuItemEntity['name'];
  imageId: IFileEntity['id'];
  price: IMenuItemEntity['price'];
  categoryId: IMenuCategoryEntity['id'];
}
