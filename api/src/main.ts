import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(cookieParser())
  app.enableCors({ origin: process.env.CORS_ORIGIN, credentials: true })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(3000)
}
bootstrap()
