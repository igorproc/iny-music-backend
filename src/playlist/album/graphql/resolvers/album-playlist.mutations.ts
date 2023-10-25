import Public from '@/decorators/isPublic.decorator'
import { NewAlbumData } from './../dto/create-album.dto'
import { PlaylistAlbumService } from '@/playlist/album/playlist-album.service'
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'

@Resolver(() => Int)
export class AlbumPlaylistMutationsResolver {
  constructor(private albumService: PlaylistAlbumService) {}

  @Public()
  @Mutation(() => String, { description: 'add new album (only artist)', nullable: true })
  async createNewAlbum(@Args('albumData', { type: () => NewAlbumData }) albumData: NewAlbumData): Promise<string> {
    return await this.albumService.createAlbum(albumData)
  }
}
