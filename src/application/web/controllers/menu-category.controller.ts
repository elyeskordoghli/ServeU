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
import { PaginateByLimitDto } from 'src/application/dtos';
import { ApiTag, RoutePrefix } from 'src/application/enums';
import { AuthUserProvider } from 'src/common/decorators';
import { isRestaurantGuard } from 'src/common/guards';
import { ParseIdPipe } from 'src/common/pipes';
import { IRestaurantEntity } from 'src/domain/interfaces/entities/restaurant-entity.interface';
import { MenuCategoryService } from 'src/domain/services/menu-category.service';
import { CreateMenuCategoryDto } from '../dtos/create-menu-category.dto';
import { UpdateMenuCategoryDto } from '../dtos/update-menu-category.dto';

@ApiTags(ApiTag.WEB_CATEGORIES)
@ApiBearerAuth()
@Controller({
  path: `${RoutePrefix.WEB}/menu-categories`,
})
@UseGuards(isRestaurantGuard)
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  getMany(@Query() dto: PaginateByLimitDto) {
    return this.menuCategoryService.paginate(dto);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIdPipe) id: string) {
    return this.menuCategoryService.find(id);
  }

  @Post()
  create(
    @AuthUserProvider() user: IRestaurantEntity,
    @Body() dto: CreateMenuCategoryDto,
  ) {
    return this.menuCategoryService.create(dto);
  }

  @Put()
  update(
    @AuthUserProvider() user: IRestaurantEntity,
    @Body() dto: UpdateMenuCategoryDto,
  ) {
    return this.menuCategoryService.update(dto);
  }

  @Delete('/:id')
  delete(
    @AuthUserProvider() user: IRestaurantEntity,
    @Param('id', ParseIdPipe) id: string,
  ) {
    return this.menuCategoryService.delete(id);
  }
}
