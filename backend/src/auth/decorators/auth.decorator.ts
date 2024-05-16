import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RecaptchaGuard } from '../guards/recaptcha.guard';

export const Auth = () => UseGuards(JwtAuthGuard);

export const ReCaptcha = () => UseGuards(RecaptchaGuard);
