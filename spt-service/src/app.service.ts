import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spt } from './spt/spt.entity';
import { CreateSptDto } from './spt/dto/cr-spt.dto';
import { UpdateSptDto } from './spt/dto/up-spt.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Spt)
    private readonly sptRepository: Repository<Spt>,
  ) {}

  async findAll(): Promise<Spt[]> {
    return await this.sptRepository.find();
  }
  
  async remove(id: number) {
    await this.sptRepository.delete(id);
    return { deleted: true };
  }
}
