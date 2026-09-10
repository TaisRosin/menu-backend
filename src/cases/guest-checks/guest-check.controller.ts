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
import { GuestCheckService } from './guest-check.service';
import { GuestCheck } from './guest-check.entity';
import { CreateGuestCheckDto } from './dto/create-guest-check';

@Controller('guest-checks')
export class GuestCheckController {
  constructor(private readonly service: GuestCheckService) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GuestCheck> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGuestCheckDto): Promise<GuestCheck> {
    return this.service.create(dto);
  }

  @Patch(':id/close')
  close(
    @Param('id', ParseUUIDPipe)
    id: string): Promise<GuestCheck> {
    return this.service.close(id);
  }
}
