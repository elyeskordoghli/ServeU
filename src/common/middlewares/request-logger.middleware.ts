import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(
    request: Request & { clientIp: string },
    response: Response,
    next: NextFunction,
  ): void {
    const startAt = process.hrtime();
    const { clientIp, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const diff = process.hrtime(startAt);
      const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed();

      this.logger.verbose(
        `${method} - ${originalUrl} | ${statusCode} | ${responseTime}ms | ${userAgent} ${clientIp}\n`,
      );
    });

    next();
  }
}
