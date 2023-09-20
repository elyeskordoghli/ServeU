import { Transform, TransformFnParams } from 'class-transformer';

export const TrimString = () =>
  Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  );
