import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SongModel } from "../dto/song.dto";
import { Public } from "@/decorators/isPublic.decorator";
import { SongService } from "@/song/song.service";
import { CreateSongInput } from "../dto/create-song.dto";
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js"
import { FileUpload } from "@/dto/file-upload.dto";

@Resolver(() => SongModel)
export class SongResolver {
  constructor(
    private songService: SongService
  ){}

  @Public()
  @Query(
    () => SongModel,
    { description: "get song by sid" }
  )
  async getSongById(
    @Args('id', { type: () => Int }) id: number
  ) {
    return await this.songService.getSongBySid(id)
  }

  @Public()
  @Mutation(
    () => SongModel,
    { description: "create song", nullable: true }
  )
  async createSong(
    @Args('songData', { type: () => CreateSongInput }) songData: CreateSongInput,
    @Args('songFile', { type: () => GraphQLUpload }) songFile: FileUpload
  ) {
    return await this.songService.createSong(songData, songFile)
  }
}