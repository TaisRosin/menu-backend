import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateSpotDto {
  @IsUUID()
  spotID: string;
}