import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '@/user/user.module';
import { AuthGuard } from '@/user/auth/auth.guard';
import { ArtistModule } from '@/artist/artist.module';
import { SongModule } from '@/song/song.module';
import { GenreModule } from '@/genre/genre.module';
import { FileManagerModule } from '@/file-manager/file-manager.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      uploads: true,
      cors: { credentials: true, origin: true }
    }),
    UserModule,
    ArtistModule,
    GenreModule,
    SongModule,
    FileManagerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
