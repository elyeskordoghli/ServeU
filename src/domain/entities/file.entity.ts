import { Column, Entity } from 'typeorm';
import { EntityColumnName, EntityName } from '../enums';
import { IFileEntity } from '../interfaces';
import { BaseEntity } from './base.entity';

@Entity(EntityName.FILE)
export class FileEntity extends BaseEntity implements IFileEntity {
  @Column({ name: EntityColumnName.PATH })
  path: string;
}
