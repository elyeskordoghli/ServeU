import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';
import { TrimString } from 'src/common/decorators';
import { TableStatus } from 'src/domain/enums';
import { IUpdateTableDto } from 'src/domain/interfaces';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends CreateTableDto implements IUpdateTableDto {
  @ApiProperty()
  @TrimString()
  @IsNumberString()
  id: string;

  @ApiProperty()
  @IsEnum(TableStatus)
  status: TableStatus;
}
