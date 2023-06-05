require('dotenv').config(); 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from '@nestjs/common';
// import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('RESTful CRUD API')
  .setDescription('This is my RESTful CRUD api built for training...')
  .setVersion('1.0')
  // .addTag('You are propt to test those APIs here...')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
    // { whitelist: true, transform: true })); 
  const PORT = process.env.PORT || 5001;
  await app.listen(PORT);
}

bootstrap().then(()=>{
    let PORT = 5001;
    const http= "http://localhost";
  console.log(`the sever is starting port ${http}: ${PORT}`)
});
