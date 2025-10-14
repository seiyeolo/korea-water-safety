import { CertificateType, CertificateStatus } from '@prisma/client';

export class CertificateResponseDto {
  id!: string;
  certificateNumber!: string;
  certificateName!: string;
  type!: CertificateType;
  status!: CertificateStatus;
  issueDate!: Date;
  expiryDate!: Date | null;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<CertificateResponseDto>) {
    Object.assign(this, partial);
  }
}
