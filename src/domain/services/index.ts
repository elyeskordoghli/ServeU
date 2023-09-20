import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { FileService } from './file.service';
import { MenuCategoryService } from './menu-category.service';
import { MenuItemService } from './menu-item.service';
import { RestaurantService } from './restaurant.service';
import { UserService } from './user.service';
import { TableService } from './table.service';

export default [
  UserService,
  AdminService,
  RestaurantService,
  AuthService,
  MenuItemService,
  MenuCategoryService,
  FileService,
  TableService,
];
