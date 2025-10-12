import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};

    return this.prisma.educationProgram.findMany({
      where,
      orderBy: {
        startDate: 'asc',
      },
      include: {
        registrations: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const program = await this.prisma.educationProgram.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return program;
  }

  // TODO: 추가 메서드 구현
  // create() - 프로그램 생성
  // update() - 프로그램 수정
  // remove() - 프로그램 삭제
  // findByDateRange() - 날짜 범위로 검색
}
