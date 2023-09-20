import { FileSystemStoredFile } from 'nestjs-form-data';

export interface IUploadFileDto {
  file: FileSystemStoredFile;
}
