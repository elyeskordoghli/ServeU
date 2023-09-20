import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { TrimString } from 'src/common/decorators';
import { IUpdateMenuItemDto } from 'src/domain/interfaces';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class UpdateMenuItemDto
  extends CreateMenuItemDto
  implements IUpdateMenuItemDto
{
  @ApiProperty()
  @TrimString()
  @IsNumberString()
  id: string;
}
