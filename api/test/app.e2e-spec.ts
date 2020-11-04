import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as cookieParser from 'cookie-parser'
import { agent, SuperAgentTest } from 'supertest'
import { Connection } from 'typeorm'
import { getEnvVar } from '../src/helpers'
import { AppModule } from './../src/app.module'
import { loadFixtures } from './test-helpers'

describe('AppModule', () => {
  let app: INestApplication
  let connection: Connection
  let request: SuperAgentTest
  let cookie: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await loadFixtures(connection, './test/fixtures')
    request = agent(app.getHttpServer())
  })

  it('should be on test DB', () => {
    expect(connection.options.database).toBe(getEnvVar('TEST_DB_NAME'))
  })

  describe('AuthModule', () => {
    it('should give 401 Unauthorized without Cookie on required auth request', async () => {
      await request.get('/workouts').expect(401)
    })

    it('should authenticate with valid credentials', async () => {
      const username = getEnvVar('USER_NAME')
      const password = getEnvVar('USER_PASSWORD')

      const response = await request
        .post('/auth/login')
        .send({ username, password })
        .expect(201)

      expect(response.headers).toHaveProperty('set-cookie')
      const cookieHeader = response.headers['set-cookie'][0]
      expect(cookieHeader).toMatch(/Authentication=(\w)*/)
      cookie = cookieHeader
    })

    it('should GET current user with his username', async () => {
      const username = getEnvVar('USER_NAME')

      const response = await request
        .get('/auth/me')
        .set('Cookie', cookie)
        .expect(200)
      expect(response.body.username).toBe(username)
    })
  })

  describe('WorkoutsModule', () => {
    it('should get workouts with given limit', async () => {
      const limit = 2
      const response = await request
        .get(`/workouts?limit=${limit}`)
        .set('Cookie', cookie)
        .expect(200)
      expect(response.body.length).toBe(limit)
    })

    it('should get workouts in given interval', async () => {
      const beginDate = '2020-01-01T00:00:00Z'
      const endDate = '2020-01-16T00:00:00Z'

      const response = await request
        .get(`/workouts?beginDate=${beginDate}&endDate=${endDate}`)
        .set('Cookie', cookie)
        .expect(200)
      expect(response.body.length).toBe(3)
    })

    it('shoud get workouts in given interval with given limit', async () => {
      const limit = 2
      const beginDate = '2020-01-01T00:00:00Z'
      const endDate = '2020-01-16T00:00:00Z'

      const response = await request
        .get(
          `/workouts?beginDate=${beginDate}&endDate=${endDate}&limit=${limit}`,
        )
        .set('Cookie', cookie)
        .expect(200)
      expect(response.body.length).toBe(limit)
    })

    it('shoud create workouts', async () => {
      const newWorkout = {
        time: 35,
        distance: 2.23,
        kcal: 103,
        program: 'fitness3',
        resistance: 13,
      }

      const response = await request
        .post(`/workouts`)
        .set('Cookie', cookie)
        .send(newWorkout)
        .expect(201)
      expect(response.body).toMatchObject(newWorkout)
    })

    it('should update workout', async () => {
      const workoutUpdate = {
        time: 35,
        distance: 2.23,
        kcal: 103,
        program: 'fitness3',
        resistance: 13,
      }

      const response = await request
        .put(`/workouts/2`)
        .set('cookie', cookie)
        .send(workoutUpdate)
        .expect(200)
      expect(response.body).toMatchObject(workoutUpdate)
    })

    it('should delete workout', async () => {
      const workoutId = 2

      const response = await request
        .delete(`/workouts/${workoutId}`)
        .set('cookie', cookie)
        .expect(200)
      expect(response.body).toMatchObject({ id: workoutId })
    })

    it('should get last workout', async () => {
      const today = new Date()

      const response = await request
        .get(`/workouts/last`)
        .set('cookie', cookie)
        .expect(200)
      expect(response.body.date).toMatch(today.toISOString().substr(0, 11))
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
