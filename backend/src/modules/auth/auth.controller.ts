import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Refresh Token으로 새로운 Access Token 발급
   */
  @Public()
  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const payload = this.authService.verifyToken(body.refreshToken);

    // 새로운 토큰 생성
    const newAccessToken = this.authService.generateAccessToken({
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    });

    return {
      success: true,
      message: '토큰이 갱신되었습니다',
      accessToken: newAccessToken,
      expiresIn: 24 * 60 * 60, // 24시간 (초 단위)
    };
  }

  /**
   * 현재 사용자 정보 조회 (인증 필요)
   */
  @Post('me')
  async getCurrentUser(@CurrentUser() user: any) {
    return {
      success: true,
      user,
    };
  }
}
