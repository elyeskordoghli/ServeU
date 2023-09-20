import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { VALID_PASSWORD_REGEX } from 'src/common/constants/regex';
import { ISignInDto } from 'src/domain/interfaces';

export class SignInDto implements ISignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(120)
  @Matches(VALID_PASSWORD_REGEX)
  password: string;
}
