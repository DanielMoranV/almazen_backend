import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // For hashing in future user creation, not directly for validatePassword here

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByDniPassword(
    dni: string,
    pass: string,
  ): Promise<any> {
    const user = await this.usersService.findOneByDni(dni);
    if (user && (await user.validatePassword(pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...result } = user; // Remove password_hash from the result
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      dni: user.dni,
      sub: user.id, // 'sub' is standard for subject (user ID)
      position: user.position,
      company_id: user.company_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
