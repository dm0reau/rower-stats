import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getEnvVar } from 'src/helpers'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { User } from './interfaces/user.interface'

describe('AuthService', () => {
  let authService: AuthService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: `${getEnvVar('JWT_EXPIRATION_TIME')}s` },
        }),
      ],
      providers: [AuthService],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    configService = module.get<ConfigService>(ConfigService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('should validate with env credentials', () => {
    const envUsername = configService.get<string>('USER_NAME')
    const envPassword = configService.get<string>('USER_PASSWORD')
    expect(authService.validateUser(envUsername, envPassword))
  })

  it('should give an access token at login', () => {
    const user: User = { userId: 'johndoe', username: 'johndoe' }
    expect(authService.login(user)).toHaveProperty('accessToken')
  })
})
