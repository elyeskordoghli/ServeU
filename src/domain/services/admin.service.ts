import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasswordHashUtil } from 'src/common/utils';
import { AdminRepository } from 'src/infrastructure/repositories/admin.repository';
import { DeepPartial } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import {
  ICreateAdminDto,
  IPaginationOptions,
  IUpdateAdminDto,
  IUserEntity,
} from '../interfaces';
import { BaseService } from './base.service';
import { UserService } from './user.service';

@Injectable()
export class AdminService
  extends BaseService<AdminEntity, AdminRepository>
  implements OnModuleInit
{
  constructor(
    private readonly passwordHashUtil: PasswordHashUtil,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    repo: AdminRepository,
  ) {
    super(repo);
  }

  async onModuleInit() {
    try {
      await this.createOne({
        name: 'Admin',
        isVerified: true,
        email: this.configService.get<string>('ADMIN_INIT_EMAIL'),
        password: await this.passwordHashUtil.hash(
          this.configService.get<string>('ADMIN_INIT_PASS'),
        ),
      });
    } catch (err) {}
  }

  async paginate(paginationOptions: IPaginationOptions) {
    return super.findAndPaginate({}, paginationOptions);
  }

  find(id: IUserEntity['id']): Promise<IUserEntity> {
    return this.findOneByOrThrowException({
      id,
    });
  }

  async create(dto: ICreateAdminDto): Promise<IUserEntity> {
    await this.userService.validateEmailExistence(dto.email);
    const newAdmin = await this.repo.save(await this.mapDtoToEntity(dto));

    return newAdmin;
  }

  async update(dto: IUpdateAdminDto): Promise<IUserEntity> {
    this.userService.validateEmailExistence(dto.email, dto.id);

    const newAdmin = await this.updateOne(
      {
        id: dto.id,
      },
      await this.mapDtoToEntity(dto),
    );

    return newAdmin;
  }

  delete(id: IUserEntity['id']): Promise<IUserEntity> {
    return this.deleteOne({
      id,
    });
  }

  private async mapDtoToEntity(
    dto: ICreateAdminDto,
  ): Promise<DeepPartial<IUserEntity>> {
    const mapped: DeepPartial<IUserEntity> = {
      name: dto.name,
      email: dto.email,
      isVerified: dto.isVerified,
    };
    if (dto.password) {
      mapped.password = await this.passwordHashUtil.hash(dto.password);
    }
    return mapped;
  }
}
