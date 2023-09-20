import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TrimString } from '../../common/decorators';

export class SearchAutoCompleteDto {
  @ApiProperty()
  @TrimString()
  @IsString()
  searchKey: string;
}
