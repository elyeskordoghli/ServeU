import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateByLimitDto } from 'src/application/dtos';
import { ApiTag } from 'src/application/enums';
import { RoutePrefix } from 'src/application/enums/route-prefix.enum';
import { isAdminGuard } from 'src/common/guards';
import { ParseIdPipe } from 'src/common/pipes';
import { RestaurantService } from 'src/domain/services/restaurant.service';
import { UpdateRestaurantDto } from '../dtos';

@ApiTags(ApiTag.BACK_OFFICE_RESTAURANT)
@Controller({
  path: `${RoutePrefix.BACK_OFFICE}/restaurants`,
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(isAdminGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getMany(@Query() dto: PaginateByLimitDto) {
    return this.restaurantService.findAndPaginate({}, dto);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIdPipe) id: string) {
    return this.restaurantService.findOneByOrThrowException({ id });
  }

  @Put()
  update(@Body() dto: UpdateRestaurantDto) {
    return this.restaurantService.update(dto);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIdPipe) id: string) {
    return this.restaurantService.deleteOne({ id });
  }
}
