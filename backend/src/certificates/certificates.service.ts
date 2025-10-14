import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { CertificateResponseDto } from './dto/certificate-response.dto';
import { CertificateStatus } from '@prisma/client';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async create(createCertificateDto: CreateCertificateDto): Promise<CertificateResponseDto> {
    // Check if certificate number already exists
    const existingCertificate = await this.prisma.certificate.findUnique({
      where: { certificateNumber: createCertificateDto.certificateNumber },
    });

    if (existingCertificate) {
      throw new ConflictException('Certificate number already exists');
    }

    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createCertificateDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const certificate = await this.prisma.certificate.create({
      data: {
        ...createCertificateDto,
        status: CertificateStatus.ACTIVE,
      },
    });

    return new CertificateResponseDto(certificate);
  }

  async findAll(): Promise<CertificateResponseDto[]> {
    const certificates = await this.prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return certificates.map(cert => new CertificateResponseDto(cert));
  }

  async findOne(id: string): Promise<CertificateResponseDto> {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    return new CertificateResponseDto(certificate);
  }

  async findByNumber(certificateNumber: string): Promise<CertificateResponseDto> {
    const certificate = await this.prisma.certificate.findUnique({
      where: { certificateNumber },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    return new CertificateResponseDto(certificate);
  }

  async findByUserInfo(name: string, birthDate: string, phone: string): Promise<CertificateResponseDto[]> {
    // 사용자 정보로 사용자 찾기
    const users = await this.prisma.user.findMany({
      where: {
        name,
        birthDate: new Date(birthDate),
        phone,
      },
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('일치하는 사용자 정보를 찾을 수 없습니다');
    }

    // 사용자의 모든 자격증 조회
    const certificates = await this.prisma.certificate.findMany({
      where: {
        userId: {
          in: users.map(u => u.id),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { issueDate: 'desc' },
    });

    if (!certificates || certificates.length === 0) {
      throw new NotFoundException('발급된 자격증이 없습니다');
    }

    return certificates.map(cert => new CertificateResponseDto(cert));
  }

  async findByUserId(userId: string): Promise<CertificateResponseDto[]> {
    const certificates = await this.prisma.certificate.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return certificates.map(cert => new CertificateResponseDto(cert));
  }

  async update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<CertificateResponseDto> {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    const updatedCertificate = await this.prisma.certificate.update({
      where: { id },
      data: updateCertificateDto,
    });

    return new CertificateResponseDto(updatedCertificate);
  }

  async revoke(id: string): Promise<CertificateResponseDto> {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    const revokedCertificate = await this.prisma.certificate.update({
      where: { id },
      data: { status: CertificateStatus.REVOKED },
    });

    return new CertificateResponseDto(revokedCertificate);
  }

  async checkExpired(): Promise<number> {
    const now = new Date();
    const result = await this.prisma.certificate.updateMany({
      where: {
        expiryDate: { lte: now },
        status: CertificateStatus.ACTIVE,
      },
      data: { status: CertificateStatus.EXPIRED },
    });

    return result.count;
  }
}
