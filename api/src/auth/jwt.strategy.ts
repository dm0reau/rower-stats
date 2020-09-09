import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { getEnvVar } from 'src/helpers'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { User } from './interfaces/user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.Authentication
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: getEnvVar('JWT_TOKEN_SECRET'),
    })
  }

  validate(payload: JwtPayload): User {
    return { username: payload.username }
  }
}
