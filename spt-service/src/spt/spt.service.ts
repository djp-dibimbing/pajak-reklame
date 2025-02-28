import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spt } from './spt.entity';
import { CreateSptDto } from './dto/cr-spt.dto';
import { UpdateSptDto } from './dto/up-spt.dto';

@Injectable()
export class SptService {
  constructor(
    @InjectRepository(Spt)
    private sptRepository: Repository<Spt>,
  ) {}

  async getAll(): Promise<Spt[]> {
    return await this.sptRepository.find();
  }

  async findOne(id: string): Promise<Spt> {
    const spt = await this.sptRepository.findOne({ where: { id_spt: id } });
    if (!spt) {
      throw new NotFoundException(`Data SPT dengan ID ${id} tidak ditemukan`);
    }
    return spt;
  }
  
  async create(createSptDto: CreateSptDto): Promise<Spt> {
    const newSpt = this.sptRepository.create(createSptDto);
    return await this.sptRepository.save(newSpt);
  }

  async update(id: string, updateSptDto: UpdateSptDto): Promise<Spt> {
    const spt = await this.findOne(id);
    if (!spt) {
      throw new NotFoundException(`Data SPT dengan ID ${id} tidak ditemukan`);
    }

    try {
      await this.sptRepository.update(id, updateSptDto);
      const updatedSpt = await this.sptRepository.findOne({ where: { id_spt: id } });
      if (!updatedSpt) {
        throw new NotFoundException(`Data SPT dengan ID ${id} tidak ditemukan setelah pembaruan`);
      }
      return updatedSpt;
    } catch (error) {
      throw new Error(`Gagal memperbarui data SPT dengan ID ${id}: ${error.message}`);
    }
  }
}
