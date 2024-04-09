import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(`SEI application`)
    .setVersion(`1.0`)
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  try {
    const outputSwaggerFile = `${process.cwd()}/output-specs/nest-based.json`;
    fs.writeFileSync(outputSwaggerFile, JSON.stringify(document, null, 2), { encoding: 'utf-8' });
  } catch (e) {
    console.warn(`Could not save swagger docs into file`, e);
  }
  SwaggerModule.setup('/docs', app, document, { customSiteTitle: `Nest based` });
}
bootstrap();
