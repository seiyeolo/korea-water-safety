import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * 강력한 비밀번호 검증 규칙:
 * - 최소 8자
 * - 대문자 포함
 * - 소문자 포함
 * - 숫자 포함
 * - 특수문자 포함 (!@#$%^&*)
 */
@ValidatorConstraint({ name: 'IsStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value) return false;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(value);
  }

  defaultMessage(): string {
    return '비밀번호는 최소 8자이며, 대문자, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다';
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}
