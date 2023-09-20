import { Transform, TransformFnParams } from 'class-transformer';

export const ParseInt = () =>
  Transform(({ value }: TransformFnParams) => Number.parseInt(value));
