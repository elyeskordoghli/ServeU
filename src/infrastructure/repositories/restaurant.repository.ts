import { Injectable } from '@nestjs/common';
import { RestaurantEntity } from 'src/domain/entities/restaurant.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RestaurantRepository extends Repository<RestaurantEntity> {
  constructor(readonly dataSource: DataSource) {
    super(RestaurantEntity, dataSource.createEntityManager());
  }
}
