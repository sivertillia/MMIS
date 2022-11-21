import * as dotenv from 'dotenv'
dotenv.config()
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/entities/*{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['src/migrations/*.ts'],
}

export default new DataSource(options)
