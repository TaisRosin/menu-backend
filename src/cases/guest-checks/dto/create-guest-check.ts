import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateGuestCheckDto {
  @IsUUID()
  spotID: string;
}