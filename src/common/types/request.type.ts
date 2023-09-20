import { Request } from 'express';
import { IUserEntity } from 'src/domain/interfaces';

export type HttpRequest = Request & { user: IUserEntity };
