import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/registrations')
  async getUserRegistrations(@Param('id') id: string) {
    return this.usersService.getUserRegistrations(id);
  }

  @Get(':id/certificates')
  async getUserCertificates(@Param('id') id: string) {
    return this.usersService.getUserCertificates(id);
  }

  // ==================== 인증 엔드포인트 ====================

  /**
   * 회원가입
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  /**
   * 로그인
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  // TODO: 추가 엔드포인트 구현
  // @Put(':id') - 회원 정보 수정
  // @Delete(':id') - 회원 삭제 (soft delete)
}
