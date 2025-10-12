import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
  password!: string;

  @IsString()
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다' })
  name!: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
