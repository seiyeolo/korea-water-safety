import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtPayload } from '../auth.service';

interface JwtError extends Error {
  name: 'TokenExpiredError' | 'JsonWebTokenError' | string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // @Public() 데코레이터가 있으면 인증 스킵
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('토큰이 필요합니다');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      (request as Request & { user: object }).user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
      return true;
    } catch (error: unknown) {
      const jwtError = error as JwtError;
      if (jwtError.name === 'TokenExpiredError') {
        throw new UnauthorizedException('토큰이 만료되었습니다');
      }
      if (jwtError.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('유효하지 않은 토큰입니다');
      }
      throw new UnauthorizedException('인증에 실패했습니다');
    }
  }

  /**
   * Authorization 헤더에서 Bearer 토큰 추출
   */
  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return null;
    }

    return token;
  }
}
