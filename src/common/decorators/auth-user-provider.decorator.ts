import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserEntity } from 'src/domain/interfaces';

export const AuthUserProvider = createParamDecorator(
  (data: string, ctx: ExecutionContext): IUserEntity => {
    const request = ctx.switchToHttp().getRequest();
    const authEndUser: IUserEntity = request.user;

    return authEndUser;
  },
);
