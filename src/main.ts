require('dotenv').config(); 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe(
  //   { whitelist: true, transform: true }));

  const PORT = process.env.PORT || 5001;
  await app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}...`) 
  });
}

bootstrap();
