import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SignUpDto } from 'src/application/web/dtos';
import { TrimString } from 'src/common/decorators';
import { IUpdateRestaurantDto } from 'src/domain/interfaces';

export class UpdateRestaurantDto
  extends SignUpDto
  implements IUpdateRestaurantDto
{
  @ApiProperty()
  @TrimString()
  @IsNumberString()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8)
  @MaxLength(120)
  password: string;

  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;
}
