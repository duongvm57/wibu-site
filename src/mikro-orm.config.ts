import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

const MikroOrmConfig: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DATABASE_NAME,
  type: 'postgresql',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  metadataProvider: TsMorphMetadataProvider,
  cache: {
    pretty: true,
    enabled: false,
  },
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: 'src/migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
};
export default MikroOrmConfig;
