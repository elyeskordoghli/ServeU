import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TrimString } from 'src/common/decorators';
import { ICreateMenuItemDto } from 'src/domain/interfaces';

export class CreateMenuItemDto implements ICreateMenuItemDto {
  @ApiProperty()
  @TrimString()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @TrimString()
  @IsNumberString()
  imageId: string;

  @ApiProperty()
  @TrimString()
  @IsNumberString()
  categoryId: string;
}
