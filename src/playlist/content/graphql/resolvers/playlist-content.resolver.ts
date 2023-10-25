import { Args, Mutation, Resolver, Int } from '@nestjs/graphql'

import Public from '@decorators/isPublic.decorator'
import { PlaylistContentService } from '@/playlist/content/playlist-content.service'
import { NewPlaylistContentData } from '@/playlist/content/graphql/dto/create-playlist-content.dto'

@Resolver(() => NewPlaylistContentData)
export class PlaylistContentResolver {
  constructor(private readonly playlistContent: PlaylistContentService) {}

  @Public()
  @Mutation(() => Int, { description: 'upload song with album connect' })
  async uploadSong(
    @Args('playlistContentData', { type: () => NewPlaylistContentData }) contentData: NewPlaylistContentData,
  ): Promise<number> {
    return await this.playlistContent.createAlbumContent(contentData)
  }
}
