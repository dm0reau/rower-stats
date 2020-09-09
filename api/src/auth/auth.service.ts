import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { User } from './interfaces/user.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string): User | null {
    const envUsername = this.configService.get<string>('USER_NAME')
    const envPassword = this.configService.get<string>('USER_PASSWORD')
    if (username === envUsername && password === envPassword) {
      return { username }
    }
    return null
  }

  getJwtToken(user: User): string {
    const payload: JwtPayload = { username: user.username }
    return this.jwtService.sign(payload)
  }
}
