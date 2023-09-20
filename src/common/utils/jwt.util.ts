import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getAccessToken<T extends Record<string, any>>(
    payload: T,
  ): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('AT_JWT_SECRET'),
      expiresIn: this.configService.get<string>('AT_JWT_EXPIRES'),
    });

    return token;
  }
}
