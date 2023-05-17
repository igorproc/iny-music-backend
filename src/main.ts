import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js"
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: true });
  app.use(
    cookieParser(),
    graphqlUploadExpress({ maxFileSize: 3e8, maxFiles: 10 })
  );
  await app.listen(parseInt(process.env.APP_PORT) || 4001);
}
bootstrap();
