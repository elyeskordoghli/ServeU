import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiTag, RoutePrefix } from 'src/application/enums';
import { AuthUserProvider } from 'src/common/decorators';
import { isRestaurantGuard } from 'src/common/guards';
import { ParseIdPipe } from 'src/common/pipes';
import { IRestaurantEntity } from 'src/domain/interfaces/entities/restaurant-entity.interface';
import { MenuItemService } from 'src/domain/services/menu-item.service';
import { CreateMenuItemDto } from '../dtos';
import { GetMenuItemsQueryDto } from '../dtos/get-menu-items-query.dto';
import { UpdateMenuItemDto } from '../dtos/update-menu-item.dto';

@ApiTags(ApiTag.WEB_MENU_ITEMS)
@ApiBearerAuth()
@Controller({
  path: `${RoutePrefix.WEB}/menu-items`,
})
@UseGuards(isRestaurantGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  getMany(
    @AuthUserProvider() user: IRestaurantEntity,
    @Query() dto: GetMenuItemsQueryDto,
  ) {
    return this.menuItemService.paginate(user, dto);
  }

  @Get('/:id')
  getOne(
    @AuthUserProvider() user: IRestaurantEntity,
    @Param('id', ParseIdPipe) id: string,
  ) {
    return this.menuItemService.find(user, id);
  }

  @Post()
  create(
    @AuthUserProvider() user: IRestaurantEntity,
    @Body() dto: CreateMenuItemDto,
  ) {
    return this.menuItemService.create(user, dto);
  }

  @Put()
  update(
    @AuthUserProvider() user: IRestaurantEntity,
    @Body() dto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(user, dto);
  }

  @Delete('/:id')
  delete(
    @AuthUserProvider() user: IRestaurantEntity,
    @Param('id', ParseIdPipe) id: string,
  ) {
    return this.menuItemService.delete(user, id);
  }
}
