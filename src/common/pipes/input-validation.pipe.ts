import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RestaurantEntity } from 'src/domain/entities/restaurant.entity';
import { UserEntity } from 'src/domain/entities/user.entity';

@Injectable()
export class InputValidationPipe implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (value) {
      const { metatype } = metadata;
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }

      const transformedValue = plainToClass(metatype, value);

      if (!(transformedValue instanceof metatype)) {
        throw new BadRequestException('Invalid inputs');
      }

      const errors = await validate(
        transformedValue,
        {
          enableImplicitConversion: true,
          stopAtFirstError: true,
        },
        {
          forbidUnknownValues: true,
        },
      );

      if (errors.length > 0) {
        throw new BadRequestException(this.getFirstErrorMessage(errors));
      }
      return transformedValue;
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private getFirstErrorMessage(errors: ValidationError[]): string {
    const errorMessages = Object.values(errors[0]?.constraints || {});
    return errorMessages[0] || 'Invalid inputs';
  }
}
