import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spt } from './spt.entity';
import { CreateSptDto } from './dto/cr-spt.dto';

@Injectable()
export class SptService {
  constructor(
    @InjectRepository(Spt)
    private sptRepository: Repository<Spt>,
  ) {}

  async getAll(): Promise<Spt[]> {
    return await this.sptRepository.find();
  }

  async getById(id: string): Promise<Spt> {
    const spt = await this.sptRepository.findOneBy({ id_spt: id });
    if (!spt) {
      throw new Error('SPT with id ${id} not found');
    }
    return spt;
  }

  async create(data: CreateSptDto): Promise<Spt> {
    const newSpt = this.sptRepository.create(data); 
    return await this.sptRepository.save(newSpt);
}

}
