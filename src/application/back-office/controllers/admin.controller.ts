import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { AdminService } from 'src/domain/services/admin.service';
import { CreateAdminDto, UpdateAdminDto } from '../dtos';

@ApiTags(ApiTag.BACK_OFFICE_ADMIN)
@Controller({
  path: `${RoutePrefix.BACK_OFFICE}/admin`,
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(isAdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getMany(@Query() dto: PaginateByLimitDto) {
    return this.adminService.paginate(dto);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIdPipe) id: string) {
    return this.adminService.find(id);
  }

  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateAdminDto) {
    return this.adminService.update(dto);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIdPipe) id: string) {
    return this.adminService.delete(id);
  }
}
