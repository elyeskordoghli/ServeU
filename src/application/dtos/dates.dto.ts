import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class FromToDateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  fromDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  toDate: string;
}
