import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { TrimString } from 'src/common/decorators';
import { ICreateMenuCategoryDto } from 'src/domain/interfaces';

export class CreateMenuCategoryDto implements ICreateMenuCategoryDto {
  @ApiProperty()
  @TrimString()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
