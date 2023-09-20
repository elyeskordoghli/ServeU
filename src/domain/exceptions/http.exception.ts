import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessageKey } from '../enums';

export class BadRequestException extends HttpException {
  constructor(
    httpExceptionMessageKey: HttpExceptionMessageKey = HttpExceptionMessageKey.BAD_REQUEST,
  ) {
    super(httpExceptionMessageKey, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundException extends HttpException {
  constructor(
    httpExceptionMessageKey: HttpExceptionMessageKey = HttpExceptionMessageKey.NOT_FOUND,
  ) {
    super(httpExceptionMessageKey, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(
    httpExceptionMessageKey: HttpExceptionMessageKey = HttpExceptionMessageKey.UNAUTHORIZED,
  ) {
    super(httpExceptionMessageKey, HttpStatus.UNAUTHORIZED);
  }
}
