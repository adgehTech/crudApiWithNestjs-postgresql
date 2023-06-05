require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import databaseConfig from './config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig), 
    UsersModule,
    AuthModule, 
    User  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
