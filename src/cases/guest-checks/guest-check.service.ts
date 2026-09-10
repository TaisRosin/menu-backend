import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { GuestCheck, GuestCheckStatus } from './guest-check.entity';
import { CreateGuestCheckDto } from './dto/create-guest-check';
import { Spot } from '../spots/spot.entity';

@Injectable()
export class GuestCheckService {

  constructor(
    @InjectRepository(GuestCheck)
    private readonly guestCheckRepository: Repository<GuestCheck>,

    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>
  ) 
  {}

  async create(dto: CreateGuestCheckDto): Promise<GuestCheck> {

    // RN 1 -- Não se abre comanda em mesa inexistente
    const spot = await this.spotRepository.findOneBy({
      id: dto.spotID,
      active: true
    });

    if (!spot){
      throw new NotFoundException('Não foi encontrada uma mesa ativa com esse ID');
    }

    // RN 2 -- Não abre comanda em mesa com comanda aberta
    const opened = await this.guestCheckRepository.exists({
      where: {spot : {id: dto.spotID}, status: GuestCheckStatus.OPENED}
    })
    if (opened) {
      throw new ConflictException('A mesa já possui uma comanda em aberto')
    }

    const guestCheck = this.guestCheckRepository.create({
      spot,
      status: GuestCheckStatus.OPENED
    });

    return this.guestCheckRepository.save(guestCheck)

  }

  async findOne(id: string): Promise<GuestCheck> {
      const guestCheck = await this.guestCheckRepository.findOneBy({ id });
  
      if (!guestCheck) {
        throw new NotFoundException('Comanda não encontrada');
      }
  
      return guestCheck;
    }

  async close(id: string) : Promise<GuestCheck>{
    const guestCheck = await this.findOne(id);

    // RN 1 -- Só pode fechar comanda aberta
    if (guestCheck.status === GuestCheckStatus.CLOSED){
      throw new BadRequestException('A comanda já está fechada');
    }

    //RN 2 -- Não pode fechar comanda com pedidos que não foram entregues


    // Se chegou, deu certo
    guestCheck.status = GuestCheckStatus.CLOSED;

    return this.guestCheckRepository.save(guestCheck);
  }

  findOpenedBySpotId(spotID: string): Promise<GuestCheck | null> {
    return this.guestCheckRepository.findOne({
      where: {
        spot: {id: spotID},
        status: GuestCheckStatus.OPENED
      },
      relations: {spot: true}
    })
  }


  async findOrCreateOpened(spotID: string): Promise<GuestCheck> {
    const opened = await this.findOpenedBySpotId(spotID);

    if (opened) {
      return opened;
    }

    return this.create({spotID})
  }
  
}
