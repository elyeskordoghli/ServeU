import { AdminController } from './admin.controller';
import { AuthController } from './auth.controller';
import { RestaurantController } from './restaurant.controller';

const backOfficeControllers = [
  AuthController,
  AdminController,
  RestaurantController,
];

export default backOfficeControllers;
