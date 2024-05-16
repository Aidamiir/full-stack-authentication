import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Auth, ReCaptcha } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Post('sign-in') @HttpCode(200)
  @ReCaptcha() @UsePipes(new ValidationPipe())
  async signIn(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.signIn(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  };

  @Post('sign-up') @HttpCode(200)
  @ReCaptcha() @UsePipes(new ValidationPipe())
  async signUp(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.signUp(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  };

  // TODO: проверить метод
  @Get('get-current') @Auth()
  async getCurrent(@CurrentUser('id') id: string) {
    return this.authService.getCurrent(id);
  };

  @Post('sign-in/refresh-token') @HttpCode(200)
  async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    );

    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return response;
  };

  @Post('logout') @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return true;
  };
}