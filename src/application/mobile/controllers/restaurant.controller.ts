import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag, RoutePrefix } from 'src/application/enums';
import { ParseIdPipe } from 'src/common/pipes';
import { RestaurantService } from 'src/domain/services/restaurant.service';

@ApiTags(ApiTag.MOBILE_RESTAURANTS)
@Controller({
  path: `${RoutePrefix.MOBILE}/restaurants`,
})
@UseInterceptors(ClassSerializerInterceptor)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get(':id')
  getOne(@Param('id', ParseIdPipe) id: string) {
    return this.restaurantService.getOne(id, true);
  }
}
