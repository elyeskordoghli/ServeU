import { BadRequestException } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';

export const ParseJson = (property: string) =>
  Transform(({ value }: TransformFnParams) => {
    try {
      return JSON.parse(value);
    } catch (err) {
      throw new BadRequestException(`${property} format is not valid`);
    }
  });
