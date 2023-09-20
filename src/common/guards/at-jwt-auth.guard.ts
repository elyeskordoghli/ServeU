import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategyKey } from 'src/domain/enums';

@Injectable()
export class AtJwtAuthGuard extends AuthGuard(AuthStrategyKey.JWT) {}
