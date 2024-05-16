import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { getJwtConfig } from 'src/config/jwt.config'

@Module({
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}