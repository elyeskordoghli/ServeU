import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';

export class RefreshTokenDto extends DeviceInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
