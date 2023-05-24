require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ConfigModule } from '@nestjs/config';

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DATABASE } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({ 
      type: DB_TYPE as any || 'postgres',
      host: DB_HOST || 'localhost',
      port: parseInt(DB_PORT) || 5432,
      username: DB_USERNAME || 'postgres',
      password: DB_PASSWORD || 'root',
      database: DATABASE || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
