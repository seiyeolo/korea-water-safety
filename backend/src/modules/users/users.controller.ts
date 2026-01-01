import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ForbiddenException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 회원 목록 조회 - 관리자만 접근 가능
   */
  @Roles('ADMIN')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * 내 프로필 조회
   */
  @Get('profile')
  async getProfile(@CurrentUser() user: AuthUser) {
    return this.usersService.findOne(user.id);
  }

  /**
   * 특정 회원 조회 - 본인 또는 관리자만 접근 가능
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    this.checkOwnershipOrAdmin(id, user);
    return this.usersService.findOne(id);
  }

  /**
   * 회원의 교육 신청 내역 조회 - 본인 또는 관리자만 접근 가능
   */
  @Get(':id/registrations')
  async getUserRegistrations(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    this.checkOwnershipOrAdmin(id, user);
    return this.usersService.getUserRegistrations(id);
  }

  /**
   * 회원의 자격증 조회 - 본인 또는 관리자만 접근 가능
   */
  @Get(':id/certificates')
  async getUserCertificates(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    this.checkOwnershipOrAdmin(id, user);
    return this.usersService.getUserCertificates(id);
  }

  /**
   * 본인 또는 관리자인지 확인
   */
  private checkOwnershipOrAdmin(resourceUserId: string, currentUser: AuthUser): void {
    if (currentUser.id !== resourceUserId && currentUser.role !== 'ADMIN') {
      throw new ForbiddenException('해당 정보에 접근할 권한이 없습니다');
    }
  }

  // ==================== 인증 엔드포인트 ====================

  /**
   * 회원가입 - 브루트포스 방지를 위해 엄격한 Rate Limiting 적용
   * 1분에 5회로 제한
   */
  @Public()
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  /**
   * 로그인 - 브루트포스 방지를 위해 엄격한 Rate Limiting 적용
   * 1분에 5회로 제한
   */
  @Public()
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  // TODO: 추가 엔드포인트 구현
  // @Put(':id') - 회원 정보 수정
  // @Delete(':id') - 회원 삭제 (soft delete)
}
