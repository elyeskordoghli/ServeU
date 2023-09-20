import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { DataSource, Not, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  alreadyExistsByEmail(email: string, toUpdateId?: string): Promise<boolean> {
    return this.exist({
      where: { email, ...(toUpdateId ? { id: Not(toUpdateId) } : {}) },
    });
  }
}
