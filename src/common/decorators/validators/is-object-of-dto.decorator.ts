import { Type } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import {
  registerDecorator,
  validate,
  ValidationOptions,
} from 'class-validator';

// validate a non primitive object type
export const IsObjectOfDto = (
  property: string,
  schemaDto: Type<any>,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsObjectOfDto',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message: `${propertyName} format is not valid`,
        ...validationOptions,
      },
      validator: {
        async validate(value: any): Promise<boolean> {
          const transformedValue = plainToClass(schemaDto, value);
          const validation = await validate(transformedValue, {
            enableImplicitConversion: true,
            stopAtFirstError: true,
          });
          if (validation.length > 0) return false;
          return true;
        },
      },
    });
  };
};
