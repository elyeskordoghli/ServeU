import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { SignInDto } from 'src/application/dtos';
import { TrimString } from 'src/common/decorators';
import { ICreateAdminDto } from 'src/domain/interfaces';

export class CreateAdminDto extends SignInDto implements ICreateAdminDto {
  @ApiProperty()
  @TrimString()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;
}
