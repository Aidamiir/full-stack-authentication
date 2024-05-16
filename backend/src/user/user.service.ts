import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(id: string) {
    const { password, ...profile } = await this.getById(id);
    return profile;
  };

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  };

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  };

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  };
}
