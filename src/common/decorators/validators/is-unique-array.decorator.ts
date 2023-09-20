import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export const IsUniqueArray = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'UniqueArray',
      target: object.constructor,
      propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (Array.isArray(value)) {
            const distinct = new Set(value);
            return distinct.size === value.length;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must not contains duplicate entries`;
        },
      },
    });
  };
};
