import { BadRequestException, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidateEmail' })
@Injectable()
export class EmailValidationRule implements ValidatorConstraintInterface {
  async validate(email: string) {
    const indexOfFirstAt = email.indexOf('@');

    const emailFirstPart = email.slice(0, indexOfFirstAt);
    const emailSecondPart = email.slice(indexOfFirstAt + 1);

    if (email.length > 254) throw new BadRequestException('Email is too long.');
    if (emailFirstPart.length > 63)
      throw new BadRequestException('Mailbox name is too long.');
    if (emailFirstPart.replace(/[^<>#&`'"!]*/g, '').length)
      throw new BadRequestException('You are using prohibited characters.');
    if (emailSecondPart.replace(/[a-zA-Z0-9-.]/g, '').length)
      throw new BadRequestException('You are using prohibited characters.');

    return true;
  }

  defaultMessage() {
    return `Email not valid`;
  }
}

export function IsEmailValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsEmailValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: EmailValidationRule,
    });
  };
}
