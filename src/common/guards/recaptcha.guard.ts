// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import axios from 'axios';
// import { ValidationErrors } from 'src/constants/validation-errors';
// import { isDevLocal } from 'src/utils/bootstrap';

// const GOOGLE_VERIFY_CAPTCHA_API_ENDPOINT = `https://www.google.com/recaptcha/api/siteverify?response=%response&secret=%secret`;

// @Injectable()
// export class RecaptchaGuard implements CanActivate {
//   constructor(private readonly configService: ConfigService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const { body } = context.switchToHttp().getRequest();

//     if (isDevLocal()) {
//       return true;
//     }

//     const response = body?.googleRecaptchaToken;
//     if (!response) this.throwInvalidError();
//     try {
//       const { data } = await axios.post(
//         GOOGLE_VERIFY_CAPTCHA_API_ENDPOINT.replace(
//           '%response',
//           response,
//         ).replace(
//           '%secret',
//           this.configService.get<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),
//         ),
//       );
//       if (!data?.success) {
//         this.throwInvalidError();
//       }
//       return true;
//     } catch (err) {
//       this.throwInvalidError();
//     }
//   }

//   private throwInvalidError() {
//     throw new BadRequestException(ValidationErrors.INVALID_RECAPTCHA);
//   }
// }
