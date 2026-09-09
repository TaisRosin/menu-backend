import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './spot.entity';
import { SpotController } from './spot.controller';
import { SpotService } from './spot.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spot])],
  controllers: [SpotController],
  providers: [SpotService],
})
export class SpotModule {}
