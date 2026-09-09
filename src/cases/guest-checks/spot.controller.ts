import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Spot } from './spot.entity';
import { SpotService } from './spot.service';
import { CreateSpotDto } from './dto/create-spot';
import { UpdateSpotDto } from './dto/update-spot';

@Controller('spots')
export class SpotController {
  constructor(private readonly service: SpotService) {}

  @Get()
  findAll(): Promise<Spot[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Spot> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSpotDto): Promise<Spot> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    dto: UpdateSpotDto,
  ): Promise<Spot> {
    return this.service.update(id, dto);
  }

  @Delete('id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.remove(id);
  }
}
