import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { getEnvVar } from './helpers'
import { WorkoutsModule } from './workouts/workouts.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: getEnvVar('DB_HOST'),
      port: 3306,
      username: getEnvVar('DB_USER'),
      password: getEnvVar('DB_PASSWORD'),
      database:
        process.env.NODE_ENV === 'test'
          ? getEnvVar('TEST_DB_NAME')
          : getEnvVar('DB_NAME'),
      synchronize: true,
      autoLoadEntities: true,
    }),
    WorkoutsModule,
  ],
})
export class AppModule {}
