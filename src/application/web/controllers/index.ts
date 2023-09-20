import { AuthController } from './auth.controller';
import { FileController } from './file.controller';
import { MenuCategoryController } from './menu-category.controller';
import { MenuItemController } from './menu-item.controller';
import { TableController } from './table.controller';

const webControllers = [
  AuthController,
  MenuItemController,
  FileController,
  MenuCategoryController,
  TableController,
];

export default webControllers;
