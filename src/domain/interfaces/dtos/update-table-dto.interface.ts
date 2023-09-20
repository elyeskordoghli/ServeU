import { ITableEntity } from '../entities';
import { ICreateTableDto } from './create-table-dto.interface';

export interface IUpdateTableDto extends ICreateTableDto {
  id: ITableEntity['id'];
  status: ITableEntity['status'];
}
