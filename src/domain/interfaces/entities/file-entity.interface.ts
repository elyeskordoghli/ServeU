import { IBaseEntity } from './base-entity.interface';

export interface IFileEntity extends IBaseEntity {
  path: string;
}
