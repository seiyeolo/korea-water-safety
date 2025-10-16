import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.findOne(user.id);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Public()
  @Get(':id/registrations')
  async getUserRegistrations(@Param('id') id: string) {
    return this.usersService.getUserRegistrations(id);
  }

  @Public()
  @Get(':id/certificates')
  async getUserCertificates(@Param('id') id: string) {
    return this.usersService.getUserCertificates(id);
  }

  // ==================== 인증 엔드포인트 ====================

  /**
   * 회원가입
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  /**
   * 로그인
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  // TODO: 추가 엔드포인트 구현
  // @Put(':id') - 회원 정보 수정
  // @Delete(':id') - 회원 삭제 (soft delete)
}
