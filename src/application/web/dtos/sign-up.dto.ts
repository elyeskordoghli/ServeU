import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { SignInDto } from 'src/application/dtos';
import { VALID_PHONE_NUMBER_REGEX } from 'src/common/constants';
import { TrimString } from 'src/common/decorators';
import { ICreateRestaurantDto } from 'src/domain/interfaces';

export class SignUpDto extends SignInDto implements ICreateRestaurantDto {
  @ApiProperty()
  @TrimString()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @TrimString()
  @IsString()
  @Matches(VALID_PHONE_NUMBER_REGEX)
  phoneNumber: string;
}
