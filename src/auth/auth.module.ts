import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule, // PassportModule.register({ defaultStrategy: 'jwt' }) can also be used
    JwtModule.register({
      secret: jwtConstants.secret, // Using constant for now
      signOptions: { expiresIn: '3600s' }, // e.g., 1 hour
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // Export JwtModule to allow other modules to use JwtAuthGuard
})
export class AuthModule {}
