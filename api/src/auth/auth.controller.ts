import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CookieOptions, Response } from 'express'
import { getEnvVar } from '../helpers'
import { AuthService } from './auth.service'
import { AppRequest } from './interfaces/app-request.interface'
import { User } from './interfaces/user.interface'

@Controller('auth')
export class AuthController {
  private readonly cookieName = 'Authentication'

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: AppRequest, @Res() res: Response): Promise<Response> {
    if (!req.body.username || !req.body.password) {
      throw new UnauthorizedException(
        "You must pass username & password as JSON in body's request",
      )
    }
    const jwtToken = this.authService.getJwtToken(req.body)
    res.cookie(this.cookieName, jwtToken, this.getCookieOptions())
    return res.send({ username: req.body.username })
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logout(@Res() res: Response): Promise<Response> {
    res.clearCookie(this.cookieName, this.getCookieOptions())
    return res.send()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser(@Req() req: AppRequest): Promise<User> {
    return req.user
  }

  private getCookieOptions(): CookieOptions {
    const jwtExpirationTime = +getEnvVar('JWT_EXPIRATION_TIME')
    const cookieDomain = getEnvVar('COOKIE_DOMAIN')
    const nodeEnv = getEnvVar('NODE_ENV')
    return {
      maxAge: jwtExpirationTime * 1000,
      httpOnly: true,
      domain: cookieDomain,
      sameSite: 'strict',
      secure: nodeEnv === 'production',
    }
  }
}
