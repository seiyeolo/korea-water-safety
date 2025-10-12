import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostCategory, PostStatus } from '@prisma/client';

interface FindAllOptions {
  category?: PostCategory;
  page?: number;
  limit?: number;
}

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options: FindAllOptions = {}) {
    const { category, page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const where = {
      ...(category && { category }),
      status: PostStatus.PUBLISHED,
    };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { isPinned: 'desc' },
          { publishedAt: 'desc' },
        ],
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          attachments: true,
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        attachments: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // 조회수 증가
    await this.prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return post;
  }

  // TODO: 추가 메서드 구현
  // create() - 게시글 생성
  // update() - 게시글 수정
  // remove() - 게시글 삭제
  // search() - 게시글 검색
}
