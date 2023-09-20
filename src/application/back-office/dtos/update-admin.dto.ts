import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TrimString } from 'src/common/decorators';
import { IUpdateAdminDto } from 'src/domain/interfaces';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends CreateAdminDto implements IUpdateAdminDto {
  @ApiProperty()
  @TrimString()
  @IsNumberString()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8)
  @MaxLength(120)
  password: string;
}
