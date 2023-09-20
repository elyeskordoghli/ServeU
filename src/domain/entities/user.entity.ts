import { Exclude } from 'class-transformer';
import { Column, Entity, TableInheritance } from 'typeorm';
import { EntityColumnName, EntityName, UserRole } from '../enums';
import { IUserEntity } from '../interfaces';
import { BaseEntity } from './base.entity';

@Entity({ name: EntityName.USER })
@TableInheritance({
  column: { name: EntityColumnName.ROLE },
})
export class UserEntity extends BaseEntity implements IUserEntity {
  @Column({ name: EntityColumnName.ROLE })
  readonly role: UserRole;

  @Column({ name: EntityColumnName.NAME })
  name: string;

  @Column({ name: EntityColumnName.EMAIL, unique: true })
  email: string;

  @Exclude()
  @Column({ name: EntityColumnName.PASSWORD })
  password: string;

  @Column({ name: EntityColumnName.IS_VERIFIED, default: false })
  isVerified: boolean;
}
