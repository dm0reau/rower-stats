import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { User } from './interfaces/user.interface'

describe('AuthService', () => {
  const JWT_TOKEN_SECRET = 'VerySecretJwtSecret'
  const JWT_EXPIRATION_TIME = 3600

  let authService: AuthService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
          secret: JWT_TOKEN_SECRET,
          signOptions: { expiresIn: `${JWT_EXPIRATION_TIME}s` },
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

  it('should give a JWT token', () => {
    const user: User = { username: 'John' }
    expect(authService.getJwtToken(user).length > 36).toBeTruthy()
  })
})
