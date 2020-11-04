import * as path from 'path'
import { Connection, getRepository } from 'typeorm'
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver,
} from 'typeorm-fixtures-cli/dist'

export async function loadFixtures(
  connection: Connection,
  fixturesPath: string,
): Promise<void> {
  try {
    const loader = new Loader()
    loader.load(path.resolve(fixturesPath))

    const resolver = new Resolver()
    const fixtures = resolver.resolve(loader.fixtureConfigs)
    const builder = new Builder(connection, new Parser())

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture)
      await getRepository(entity.constructor.name).save(entity)
    }
  } catch (err) {
    throw err
  }
}
