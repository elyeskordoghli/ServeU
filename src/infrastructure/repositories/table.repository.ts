import { Injectable } from '@nestjs/common';
import { TableEntity } from 'src/domain/entities/table.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TableRepository extends Repository<TableEntity> {
  constructor(readonly dataSource: DataSource) {
    super(TableEntity, dataSource.createEntityManager());
  }
}
