import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategyKey } from '../enums';
import { UnauthorizedException } from '../exceptions';
import { UserService } from '../services/user.service';
import { JwtPayload } from '../types';

@Injectable()
export class AtJwtStrategy extends PassportStrategy(
  Strategy,
  AuthStrategyKey.JWT,
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('AT_JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.userId) {
      return this.userService.findOneByOrThrowException({
        id: payload.userId,
        isVerified: true,
      });
    }
    throw new UnauthorizedException();
  }
}
