import { IsString, IsEnum, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CertificateType } from '@prisma/client';

export class CreateCertificateDto {
  @IsString()
  certificateNumber!: string;

  @IsString()
  certificateName!: string;

  @IsEnum(CertificateType)
  type!: CertificateType;

  @IsDate()
  @Type(() => Date)
  issueDate!: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiryDate?: Date;

  @IsString()
  userId!: string;
}
