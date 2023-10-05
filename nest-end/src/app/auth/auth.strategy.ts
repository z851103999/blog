import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import defineConfig from '../../config/config.development';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: defineConfig.jwt.secret,
    });
  }

  async validate(payload) {
    return {
      userId: payload.sub,
      nickname: payload.nickname,
    };
  }
}
