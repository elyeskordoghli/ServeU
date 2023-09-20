import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { TrimString } from 'src/common/decorators';
import { IUpdateMenuCategoryDto } from 'src/domain/interfaces';
import { CreateMenuCategoryDto } from './create-menu-category.dto';

export class UpdateMenuCategoryDto
  extends CreateMenuCategoryDto
  implements IUpdateMenuCategoryDto
{
  @ApiProperty()
  @TrimString()
  @IsNumberString()
  id: string;
}
