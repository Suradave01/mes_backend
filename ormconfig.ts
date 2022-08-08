import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const {
  TYPEORM_CONNECTION: type,
  TYPEORM_HOST: host,
  TYPEORM_PORT: port,
  TYPEORM_USERNAME: username,
  TYPEORM_PASSWORD: password,
  TYPEORM_DATABASE: database,
  TYPEORM_SYNCHRONIZE: synchronize,
  // TYPEORM_KEEPCONNECTIONALIVE: keepConnectionAlive,
  TYPEORM_LOGGING: logging,

  TYPEORM_ENTITIES: entities,
  TYPEORM_MIGRATIONS: migrations,
  TYPEORM_MIGRATIONS_DIR: migrationsDir,
  TYPEORM_SEEDING_SEEDS: typeOrmSeedingSeeds,
  TYPEORM_SEEDING_FACTORIES: typeOrmSeedingFactories,
} = process.env;

const typeOrmConfig = {
  type,
  host,
  port: Number(port),
  username,
  password,
  database,
  synchronize: synchronize === 'true',
  // keepConnectionAlive: keepConnectionAlive === 'true',
  logging: logging === 'true',
  entities: [entities],
  migrations: [migrations],
  cli: {
    migrationsDir,
  },
  seeds: typeOrmSeedingSeeds,
  factories: typeOrmSeedingFactories,
} as TypeOrmModuleOptions;

module.exports = typeOrmConfig;
