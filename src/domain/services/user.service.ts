import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { HttpExceptionMessageKey } from '../enums';
import { BadRequestException } from '../exceptions';
import { IUserEntity } from '../interfaces';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
  constructor(repo: UserRepository) {
    super(repo);
  }

  async validateEmailExistence(
    email: IUserEntity['email'],
    toUpdateId?: IUserEntity['id'],
  ) {
    const emailAlreadyExists = await this.repo.alreadyExistsByEmail(
      email,
      toUpdateId,
    );

    if (emailAlreadyExists) {
      throw new BadRequestException(
        HttpExceptionMessageKey.USER_EMAIL_ALREADY_EXISTS,
      );
    }
  }
}
