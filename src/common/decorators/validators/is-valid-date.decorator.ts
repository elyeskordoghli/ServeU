import { registerDecorator, ValidationOptions } from 'class-validator';
import * as moment from 'moment';

export const IsValidDate = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: {
        message: `${propertyName} should not be empty`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && moment(value).isValid();
        },
      },
    });
  };
};
