import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-profile') @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id);
  }
}