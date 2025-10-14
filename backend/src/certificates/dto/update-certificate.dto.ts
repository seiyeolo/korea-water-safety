import { IsString, IsEnum, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CertificateStatus } from '@prisma/client';

export class UpdateCertificateDto {
  @IsOptional()
  @IsString()
  certificateName?: string;

  @IsOptional()
  @IsEnum(CertificateStatus)
  status?: CertificateStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiryDate?: Date;
}
