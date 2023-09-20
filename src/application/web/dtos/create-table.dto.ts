import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { TrimString } from 'src/common/decorators';
import { ICreateTableDto } from 'src/domain/interfaces';

export class CreateTableDto implements ICreateTableDto {
  @ApiProperty()
  @IsString()
  @TrimString()
  @MinLength(1)
  @MaxLength(4)
  name: string;
}
