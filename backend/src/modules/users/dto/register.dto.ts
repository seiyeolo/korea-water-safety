import { IsEmail, IsString, MinLength, IsOptional, Matches } from 'class-validator';
import { IsStrongPassword } from '@/common/decorators/is-strong-password.decorator';

export class RegisterDto {
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요' })
  email!: string;

  @IsString()
  @IsStrongPassword({
    message: '비밀번호는 최소 8자이며, 대문자, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다',
  })
  password!: string;

  @IsString()
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다' })
  name!: string;

  @IsString()
  @IsOptional()
  @Matches(/^01[0-9]-?\d{3,4}-?\d{4}$/, {
    message: '유효한 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)',
  })
  phone?: string;
}
