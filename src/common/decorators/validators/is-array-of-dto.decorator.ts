import { Type } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import {
  registerDecorator,
  validate,
  ValidationOptions,
} from 'class-validator';

const validateArrayOfDto = async (values: any[], schemaDto: Type<any>) => {
  for (const value of values) {
    const transformedValue = plainToClass(schemaDto, value);
    const validation = await validate(transformedValue, {
      enableImplicitConversion: true,
      stopAtFirstError: true,
    });
    if (validation.length > 0) return false;
  }
  return true;
};
// validate a non primitive array type
export const IsArrayOfDto = (
  property: string,
  schemaDto: Type<any>,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsArrayOfDto',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message: `${propertyName} format is not valid`,
        ...validationOptions,
      },
      validator: {
        async validate(value: any): Promise<boolean> {
          return Array.isArray(value) && validateArrayOfDto(value, schemaDto);
        },
      },
    });
  };
};
