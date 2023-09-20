import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityColumnName } from '../enums';
import { IBaseEntity, ITimeStampsEntity } from '../interfaces';

export abstract class TimeStampsEntity implements ITimeStampsEntity {
  @CreateDateColumn({ name: EntityColumnName.CREATED_AT, type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: EntityColumnName.UPDATED_AT, type: 'timestamptz' })
  updatedAt: Date;
}

export abstract class BaseEntity
  extends TimeStampsEntity
  implements IBaseEntity
{
  @PrimaryGeneratedColumn('increment', {
    name: EntityColumnName.ID,
    type: 'bigint',
  })
  id: string;
}
