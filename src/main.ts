import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js"
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, maxAge: 86400 });
  app.use(
    cookieParser(),
    graphqlUploadExpress({ maxFileSize: 3e7, maxFiles: 10 })
  );
  await app.listen(parseInt(process.env.APP_PORT) || 4001);
}
bootstrap();
