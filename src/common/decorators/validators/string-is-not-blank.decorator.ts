import { registerDecorator, ValidationOptions } from 'class-validator';

export const StringIsNotBlank = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'StringIsNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message: `${propertyName} should not be empty`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim().length > 0;
        },
      },
    });
  };
};
