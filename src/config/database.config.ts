import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DATABASE } = process.env;

const config: TypeOrmModuleOptions = {
  type: 'postgres', //process.env.DB_TYPE || DB_TYPE,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME, 
  password: DB_PASSWORD,
  database: DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config; 