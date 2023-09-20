import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { access, copyFile, mkdir, unlink } from 'fs/promises';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { join } from 'path';
import { FileRepository } from 'src/infrastructure/repositories/file.repository';
import { FileEntity } from '../entities/file.entity';
import { IFileEntity, IUploadFileDto } from '../interfaces';
import { BaseService } from './base.service';

@Injectable()
export class FileService extends BaseService<FileEntity, FileRepository> {
  private readonly uploadLogger = new Logger(FileService.name);

  constructor(
    private readonly configService: ConfigService,
    repo: FileRepository,
  ) {
    super(repo);
  }
  async uploadImage({ file }: IUploadFileDto): Promise<IFileEntity> {
    const filePath = await this.uploadFile(file, 'images');
    return this.createOne({
      path: `${this.configService.get<string>(
        'UPLOAD_FILES_SERVER_URL_PREFIX',
      )}/${filePath}`,
    });
  }

  async uploadFile(
    file: FileSystemStoredFile,
    collectionName: string,
  ): Promise<string> {
    const path = await this.generateFilePath(file.originalName, collectionName);
    await copyFile(file.path, path);
    return path.replace('public/', '').replace('public\\', '');
  }

  async deleteFileOrThrowNotFound(id: string) {
    const file = await this.findOneByOrThrowException({ id });
    if (file) await this.deleteFileByPath(file.path);
  }

  async deleteFile(file: FileEntity) {
    if (file) {
      await this.deleteFileByPath(file.path);
      await this.repo.remove(file);
    }
  }

  async deleteFileByPath(filePath: string) {
    try {
      await unlink(
        join(
          './public/',
          filePath.replace(
            `${this.configService.get<string>(
              'UPLOAD_FILES_SERVER_URL_PREFIX',
            )}/`,
            '',
          ),
        ),
      );
    } catch (err) {
      this.uploadLogger.error(err);
    }
  }

  private async generateFilePath(
    fileName: string,
    collectionName: string,
  ): Promise<string> {
    const folderPath = join('./public/uploads', collectionName);

    await this.createFolderIfNotExists(folderPath);
    return join(
      folderPath,
      `${Date.now()}-${randomBytes(4).toString('hex')}-${fileName}`,
    );
  }

  private createFolderIfNotExists(folderPath: string): Promise<void> {
    return new Promise((resolve) => {
      access(folderPath)
        .then(() => {
          resolve();
        })
        .catch(async () => {
          await mkdir(folderPath, { recursive: true });
          resolve();
        });
    });
  }
}
