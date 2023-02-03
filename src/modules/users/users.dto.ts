import { IsByteLength, MaxLength, MinLength } from 'class-validator';
import { IsEmailValid } from '../../validation/email.validation';

export class CreateUserDto {
  @IsEmailValid()
  username: string;

  @MinLength(8)
  @MaxLength(64)
  @IsByteLength(8, 72)
  password: string;
}

export class ChangePasswordDto {
  @MinLength(8)
  @MaxLength(64)
  @IsByteLength(8, 72)
  newPassword: string;
}
