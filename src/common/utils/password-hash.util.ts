import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordHashUtil {
  constructor(private readonly configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    const hashed = await argon2.hash(this.getPasswordWithSalt(password));
    return hashed;
  }

  async verify(hashedPassword: string, password: string): Promise<boolean> {
    const areEqual = await argon2.verify(
      hashedPassword,
      this.getPasswordWithSalt(password),
    );
    return areEqual;
  }

  private getPasswordWithSalt(password: string): string {
    return `${password}${this.configService.get<string>('PASSWORD_SALT')}`;
  }
}
