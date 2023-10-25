import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { S3Module } from 'nestjs-s3'

import { UserModule } from '@/user/user.module'
import { AuthGuard } from '@/user/auth/auth.guard'
import { ArtistModule } from '@/artist/artist.module'
import { SongModule } from '@/song/song.module'
import { GenreModule } from '@/genre/genre.module'
import { FileManagerModule } from '@/file-manager/file-manager.module'
import { PlaylistModule } from '@/playlist/playlist.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: process.env.APP_MODE === 'local',
      autoSchemaFile: 'schema.gql',
      uploads: true,
      cors: { credentials: true, origin: true },
    }),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_PRIVATE_KEY,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
    UserModule,
    ArtistModule,
    GenreModule,
    SongModule,
    FileManagerModule,
    PlaylistModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
