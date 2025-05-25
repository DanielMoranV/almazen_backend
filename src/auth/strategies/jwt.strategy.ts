import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../auth.constants'; // We will update this later if using .env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // For now, using the constant
    });
  }

  async validate(payload: any) {
    // The payload is the decoded JWT.
    // We trust the JWT is valid at this point (signature verified, not expired).
    // We can enrich the request.user object with more details if needed,
    // but for now, returning the payload itself or a subset is fine.
    return {
      userId: payload.sub,
      dni: payload.dni,
      position: payload.position,
      company_id: payload.company_id,
    };
  }
}
