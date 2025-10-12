import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  async findAll(@Query('isActive') isActive?: string) {
    // isActive가 명시적으로 전달되지 않으면 undefined로 전달 (모든 프로그램 반환)
    const isActiveFilter = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
    return this.programsService.findAll(isActiveFilter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  // TODO: 추가 엔드포인트 구현
  // @Post() - 프로그램 생성
  // @Put(':id') - 프로그램 수정
  // @Delete(':id') - 프로그램 삭제
}
