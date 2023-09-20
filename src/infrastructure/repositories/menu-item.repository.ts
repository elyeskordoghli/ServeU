import { Injectable } from '@nestjs/common';
import { MenuItemEntity } from 'src/domain/entities/menu-item.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MenuItemRepository extends Repository<MenuItemEntity> {
  constructor(readonly dataSource: DataSource) {
    super(MenuItemEntity, dataSource.createEntityManager());
  }
}
