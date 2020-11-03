import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    connection = app.get(Connection)
  })

  afterAll(async () => {
    connection.close()
    app.close()
  })

  it('should be on test DB', () => {
    expect(connection.options.database).toBe('rower-stats-test')
  })
})
