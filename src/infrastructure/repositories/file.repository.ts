import { Injectable } from '@nestjs/common';
import { FileEntity } from 'src/domain/entities/file.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(readonly dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager());
  }
}
