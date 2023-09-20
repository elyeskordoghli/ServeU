import { Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/domain/entities/admin.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AdminRepository extends Repository<AdminEntity> {
  constructor(readonly dataSource: DataSource) {
    super(AdminEntity, dataSource.createEntityManager());
  }
}
