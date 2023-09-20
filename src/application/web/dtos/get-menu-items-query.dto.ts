import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PaginateByLimitDto } from 'src/application/dtos';
import { TrimString } from 'src/common/decorators';
import { IGetMenuItemsQueryDto } from 'src/domain/interfaces';

export class GetMenuItemsQueryDto
  extends PaginateByLimitDto
  implements IGetMenuItemsQueryDto
{
  @ApiProperty({ required: false })
  @IsOptional()
  @TrimString()
  @IsNumberString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @TrimString()
  @IsString()
  @MaxLength(32)
  searchKey?: string;
}
