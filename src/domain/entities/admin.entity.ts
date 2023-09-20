import { ChildEntity } from 'typeorm';
import { UserRole } from '../enums';
import { IUserEntity } from '../interfaces';
import { UserEntity } from './user.entity';

@ChildEntity(UserRole.ADMIN)
export class AdminEntity extends UserEntity implements IUserEntity {}
