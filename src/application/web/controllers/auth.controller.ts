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
import { ApiTag, RoutePrefix } from 'src/application/enums';
import { AuthUserProvider } from 'src/common/decorators';
import { isRestaurantGuard } from 'src/common/guards';
import { UserRole } from 'src/domain/enums';
import { IUserEntity } from 'src/domain/interfaces';
import { AuthService } from 'src/domain/services/auth.service';
import { RestaurantService } from 'src/domain/services/restaurant.service';
import { SignUpDto } from '../dtos';

@ApiTags(ApiTag.WEB_AUTH)
@Controller({
  path: `${RoutePrefix.WEB}/auth`,
})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly restaurantService: RestaurantService,
  ) {}

  @Get('info')
  @ApiBearerAuth()
  @UseGuards(isRestaurantGuard)
  getOne(@AuthUserProvider() user: IUserEntity) {
    return user;
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto, UserRole.RESTAURANT);
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignUpDto) {
    return this.restaurantService.create(dto);
  }
}
