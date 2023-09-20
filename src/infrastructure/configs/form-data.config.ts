import { FileSystemStoredFile } from 'nestjs-form-data';
import { FormDataInterceptorConfig } from 'nestjs-form-data/dist/interfaces';

export const getFormDataModuleConfigs = (): // configService: ConfigService,
FormDataInterceptorConfig => ({
  storage: FileSystemStoredFile,
  fileSystemStoragePath: 'public/uploads/cache',
});
