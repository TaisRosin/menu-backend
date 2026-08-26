import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot';
import { UpdateSpotDto } from './dto/update-spot';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  findAll(): Promise<Spot[]> {
    return this.spotRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Spot> {
    const spot = await this.spotRepository.findOneBy({ id });

    if (!spot) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return spot;
  }

  create(dto: CreateSpotDto): Promise<Spot> {
    const spot = this.spotRepository.create({
      ...dto,
      name: dto.name,
      active: true,
    });

    return this.spotRepository.save(spot);
  }

  async update(id: string, dto: UpdateSpotDto): Promise<Spot> {
    const spot = await this.findOne(id);

    if (dto.name !== undefined) {
      spot.name = dto.name;
    }

    if (dto.active !== undefined) {
      spot.active = dto.active;
    }

    return this.spotRepository.save(spot);
  }

  async remove(id:string): Promise<void> {
    const spot = await this.findOne(id);

    await this.spotRepository.remove(spot);
  }
}
