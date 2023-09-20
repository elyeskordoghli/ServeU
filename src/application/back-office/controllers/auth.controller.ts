import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from 'src/application/dtos';
import { ApiTag } from 'src/application/enums';
import { RoutePrefix } from 'src/application/enums/route-prefix.enum';
import { AuthUserProvider } from 'src/common/decorators';
import { isAdminGuard } from 'src/common/guards';
import { UserRole } from 'src/domain/enums';
import { IUserEntity } from 'src/domain/interfaces';
import { AuthService } from 'src/domain/services/auth.service';
@ApiTags(ApiTag.BACK_OFFICE_AUTH)
@Controller({
  path: `${RoutePrefix.BACK_OFFICE}/auth`,
})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('info')
  @ApiBearerAuth()
  @UseGuards(isAdminGuard)
  getOne(@AuthUserProvider() user: IUserEntity) {
    return user;
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto, UserRole.ADMIN);
  }
}
