import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Events API')
    .setDescription('The events API description')
    .setVersion('1.0')
    .addTag('events')
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

=======
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
>>>>>>> dfba103 (Develop (#36))
  await app.listen(3000);
}
bootstrap();
