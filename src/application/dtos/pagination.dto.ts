import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ParseInt } from 'src/common/decorators';
import { IPaginationOptions } from 'src/domain/interfaces';

export class PaginateByPageDto {
  @ApiProperty()
  @IsNumber()
  @ParseInt()
  @IsNotEmpty()
  @Min(1)
  page: number;
}

export class PaginateByLimitDto
  extends PaginateByPageDto
  implements IPaginationOptions
{
  @ApiProperty()
  @IsNumber()
  @ParseInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  limit: number;
}
