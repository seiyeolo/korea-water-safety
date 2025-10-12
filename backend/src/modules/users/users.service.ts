import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        status: UserStatus.ACTIVE,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        // password 제외
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        birthDate: true,
        address: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        // password 제외
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getUserRegistrations(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.registration.findMany({
      where: { userId: id },
      include: {
        program: {
          select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUserCertificates(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.certificate.findMany({
      where: { userId: id },
      orderBy: {
        issueDate: 'desc',
      },
    });
  }

  // ==================== 인증 메서드 ====================

  /**
   * 회원가입
   */
  async register(registerDto: RegisterDto) {
    // 이메일 중복 확인
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 회원 생성
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        name: registerDto.name,
        phone: registerDto.phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: '회원가입이 완료되었습니다',
      user,
    };
  }

  /**
   * 로그인
   */
  async login(loginDto: LoginDto) {
    // 이메일로 사용자 조회
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    // 계정 상태 확인
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('비활성화된 계정입니다');
    }

    // 마지막 로그인 시간 업데이트
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // 비밀번호 제외하고 반환
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: '로그인에 성공했습니다',
      user: userWithoutPassword,
    };
  }

  /**
   * 이메일로 사용자 조회
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  // TODO: 추가 메서드 구현
  // update() - 회원 정보 수정
  // remove() - 회원 삭제 (soft delete)
}
