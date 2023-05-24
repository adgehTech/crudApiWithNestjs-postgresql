require('dotenv').config(); 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';
// import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('CRUD API')
  .setDescription('This is Crud api built for training...')
  .setVersion('1.0')
  .addTag('Lets Biggen...')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalPipes(new ValidationPipe(
  //   { whitelist: true, transform: true }));

  const PORT = process.env.PORT || 5001;
  await app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}...`) 
  });
}

bootstrap();
