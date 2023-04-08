import { Resolver } from '@nestjs/graphql';
import { ArtistModel } from '../dto/artist.dto';

@Resolver(of => ArtistModel)
export class ArtistResolver {}
