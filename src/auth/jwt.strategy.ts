
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        // Passport verifica a assinatura JWT e decodifica o JSON
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // Passa como argumento o JSON decodificado
  async validate(payload: any) {

    // Poderíamos fazer uma busca por mais infos no BD aqui
    
    return { id: payload.sub, username: payload.username };
  }
}
