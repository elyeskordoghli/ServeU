import { Injectable } from '@nestjs/common';
import { PasswordHashUtil } from 'src/common/utils';
import { JwtUtil } from 'src/common/utils/jwt.util';
import { HttpExceptionMessageKey, UserRole } from '../enums';
import { UnauthorizedException } from '../exceptions';
import { ISignInDto } from '../interfaces';
import { AuthResponse, JwtPayload } from '../types';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHashUtil: PasswordHashUtil,
    private readonly jwtUtil: JwtUtil,
  ) {}

  async signIn(dto: ISignInDto, role: UserRole): Promise<AuthResponse> {
    const user = await this.userService.findOneByOrThrowException(
      {
        email: dto.email,
        role,
      },
      new UnauthorizedException(
        HttpExceptionMessageKey.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST,
      ),
    );

    if (!user.isVerified) {
      throw new UnauthorizedException(
        HttpExceptionMessageKey.USER_IS_NOT_VERIFIED_YET,
      );
    }

    const passwordIsValid = await this.passwordHashUtil.verify(
      user.password,
      dto.password,
    );
    if (passwordIsValid) {
      const accessToken = await this.jwtUtil.getAccessToken<JwtPayload>({
        userId: user.id,
      });

      return {
        user,
        accessToken,
      };
    }

    throw new UnauthorizedException(HttpExceptionMessageKey.INCORRECT_PASSWORD);
  }
}
