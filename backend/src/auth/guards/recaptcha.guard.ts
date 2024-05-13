import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  private readonly RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';
  private readonly RECAPTCHA_SECRET_KEY = '6LcdztopAAAAADAtI9_OIc0qJLYQAAU5W6BHthaU';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body.token;

    if (!token) {
      throw new UnauthorizedException('reCAPTCHA token is missing');
    }

    const isValid = await this.verifyRecaptcha(token);
    if (!isValid) {
      throw new UnauthorizedException('reCAPTCHA verification failed');
    }

    return true;
  }

  private async verifyRecaptcha(token: string): Promise<boolean> {
    const response = await fetch(`${this.RECAPTCHA_URL}?secret=${this.RECAPTCHA_SECRET_KEY}&response=${token}`, {
      method: 'POST'
    });
    const data = await response.json();
    return data.success;
  }
}
