import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { HttpExceptionMessageKey } from 'src/domain/enums';

export class ParseIdPipe implements PipeTransform<string> {
  transform(value: string): number {
    const valueAsNumber = Number.parseInt(value);

    if (!isNumberString(value) || isNaN(valueAsNumber)) {
      throw new BadRequestException(HttpExceptionMessageKey.INVALID_ID);
    }

    return valueAsNumber;
  }
}
