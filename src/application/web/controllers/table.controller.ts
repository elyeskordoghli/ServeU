import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiTag, RoutePrefix } from 'src/application/enums';
import { AuthUserProvider } from 'src/common/decorators';
import { isRestaurantGuard } from 'src/common/guards';
import { ParseIdPipe } from 'src/common/pipes';
import { IRestaurantEntity } from 'src/domain/interfaces/entities/restaurant-entity.interface';
import { TableService } from 'src/domain/services/table.service';
import { CreateTableDto, UpdateTableDto } from '../dtos';

@ApiTags(ApiTag.WEB_TABLES)
@ApiBearerAuth()
@Controller({
  path: `${RoutePrefix.WEB}/tables`,
})
@UseGuards(isRestaurantGuard)
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  getAll(@AuthUserProvider() user: IRestaurantEntity) {
    return this.tableService.findAll(user);
  }

  @Get('/:id')
  getOne(
    @AuthUserProvider() user: IRestaurantEntity,
    @Param('id', ParseIdPipe) id: string,
  ) {
    return this.tableService.find(user, id);
  }

  @Post()
  create(
    @AuthUserProvider() user: IRestaurantEntity,
    @Body() dto: CreateTableDto,
  ) {
    return this.tableService.create(user, dto);
  }

  @Put()
  update(
    @AuthUserProvider() user: IRestaurantEntity,
    @Body() dto: UpdateTableDto,
  ) {
    return this.tableService.update(user, dto);
  }

  @Delete('/:id')
  delete(
    @AuthUserProvider() user: IRestaurantEntity,
    @Param('id', ParseIdPipe) id: string,
  ) {
    return this.tableService.delete(user, id);
  }
}
