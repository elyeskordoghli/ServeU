import { ApiProperty } from '@nestjs/swagger';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';
import { IUploadFileDto } from 'src/domain/interfaces';

export class UploadImageDto implements IUploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsFile()
  @MaxFileSize(3e6, {
    message: 'Maximum image file size is 3Mo',
  })
  @HasMimeType(['image/jpeg', 'image/png'])
  file: FileSystemStoredFile;
}
