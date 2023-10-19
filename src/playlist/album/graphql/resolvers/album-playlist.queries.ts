import { Args, Query, Resolver } from '@nestjs/graphql'
import { PlaylistAlbumService } from '@/playlist/album/playlist-album.service'
import { AlbumDataOutput } from '../dto/album.dto'
import Public from '@/decorators/isPublic.decorator'

@Resolver(() => AlbumDataOutput)
export class AlbumPlaylistQueriesResolver {
  constructor(private readonly albumService: PlaylistAlbumService) {}

  @Public()
  @Query(() => AlbumDataOutput, { description: 'get album data' })
  async getAlbumByShareToken(@Args('shareToken', { type: () => String }) shareToken: string): Promise<AlbumDataOutput> {
    return await this.albumService.getAlbumData(shareToken)
  }
}
