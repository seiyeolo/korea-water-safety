import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 현재 사용자 정보를 자동으로 주입
 * @example async getProfile(@CurrentUser() user: any) { }
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
