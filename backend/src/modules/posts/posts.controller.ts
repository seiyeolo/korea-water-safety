import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostCategory } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async findAll(
    @Query('category') category?: PostCategory,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.postsService.findAll({
      category,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // TODO: 추가 엔드포인트 구현
  // @Post() - 게시글 생성
  // @Put(':id') - 게시글 수정
  // @Delete(':id') - 게시글 삭제
  // @Post(':id/view') - 조회수 증가
}
