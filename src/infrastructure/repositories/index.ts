import { AdminRepository } from './admin.repository';
import { FileRepository } from './file.repository';
import { MenuCategoryRepository } from './menu-category.repository';
import { MenuItemRepository } from './menu-item.repository';
import { RestaurantRepository } from './restaurant.repository';
import { TableRepository } from './table.repository';
import { UserRepository } from './user.repository';

export default [
  UserRepository,
  RestaurantRepository,
  MenuItemRepository,
  MenuCategoryRepository,
  FileRepository,
  AdminRepository,
  TableRepository,
];
