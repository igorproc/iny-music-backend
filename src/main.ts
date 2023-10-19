import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import * as cookieParser from 'cookie-parser'
import { COOKIE_MAX_AGE } from './types/cookie'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ credentials: true, origin: true, maxAge: COOKIE_MAX_AGE })
  app.use(cookieParser(), graphqlUploadExpress({ maxFileSize: 3e50, maxFiles: 30 }))
  await app.listen(parseInt(process.env.APP_PORT) || 4001)
}
bootstrap()
