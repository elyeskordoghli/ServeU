import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserRole } from 'src/domain/enums';
import { HttpRequest } from '../types/request.type';
import { AtJwtAuthGuard } from './at-jwt-auth.guard';

export const userHasRoleFromReq = (
  req: HttpRequest,
  role: UserRole,
): boolean => {
  const { user } = req;
  return user && user instanceof UserEntity && user.role === role;
};

@Injectable()
export class UserRoleGuard extends AtJwtAuthGuard {
  constructor(private readonly role: UserRole) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    return userHasRoleFromReq(context.switchToHttp().getRequest(), this.role);
  }
}

export const isRestaurantGuard = new UserRoleGuard(UserRole.RESTAURANT);
export const isAdminGuard = new UserRoleGuard(UserRole.ADMIN);
