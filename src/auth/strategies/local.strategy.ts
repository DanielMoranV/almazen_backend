import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'dni' }); // Use 'dni' as the username field
  }

  async validate(dni: string, password: string): Promise<any> {
    const user = await this.authService.validateUserByDniPassword(dni, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user; // This will be attached to req.user
  }
}
