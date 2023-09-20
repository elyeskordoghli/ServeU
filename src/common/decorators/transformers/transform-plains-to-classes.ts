import { Type } from '@nestjs/common';
import { plainToClass, Transform, TransformFnParams } from 'class-transformer';

export const TransformPlainsToClasses = (schema: Type<any>) =>
  Transform(({ value }: TransformFnParams) => {
    if (Array.isArray(value)) {
      return value.map((v) => plainToClass(schema, v));
    }
    return value;
  });
