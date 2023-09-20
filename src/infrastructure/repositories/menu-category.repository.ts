import { Injectable } from '@nestjs/common';
import { MenuCategoryEntity } from 'src/domain/entities/menu-category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MenuCategoryRepository extends Repository<MenuCategoryEntity> {
  constructor(readonly dataSource: DataSource) {
    super(MenuCategoryEntity, dataSource.createEntityManager());
  }
}
