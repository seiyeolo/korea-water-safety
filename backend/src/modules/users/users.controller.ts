import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

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

  // TODO: 추가 엔드포인트 구현
  // @Post() - 회원 생성
  // @Put(':id') - 회원 정보 수정
  // @Delete(':id') - 회원 삭제
  // @Post('register') - 회원 가입
  // @Post('login') - 로그인
}
