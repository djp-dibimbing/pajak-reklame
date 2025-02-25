import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WajibPajakEntity } from './entity/wp.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { json } from 'stream/consumers';
import { CreateWpDto } from './dto/cr-wp.dto';
import { UpdateWpDto } from './dto/up-wp.dto';

@Injectable()
export class WajibPajakService {
    constructor(
        @InjectRepository(WajibPajakEntity) private wpRepository: Repository<WajibPajakEntity>,
    ) {}

    async findAll(): Promise<WajibPajakEntity[]> {
        return this.wpRepository.find();
    }

    async findByNpwp(npwp: string): Promise<WajibPajakEntity | null> {
        const wp = this.wpRepository.findOne({ where: { npwp } });
        if (!wp) {
            throw new NotFoundException('Wajib Pajak atas NPWP ' +npwp+ ' tidak ditemukan');
        }
        return wp;
    }

    async create(data: CreateWpDto): Promise<WajibPajakEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const wp = await this.findByNpwp(data.npwp);
        if (wp) {
            throw new BadRequestException('Wajib Pajak atas NPWP ' +data.npwp+ ' sudah pernah direkam');
        }
        return this.wpRepository.save(data);
    }

    async update(data: UpdateWpDto): Promise<WajibPajakEntity> {
        if (!data.npwp) {
            throw new BadRequestException('NPWP tidak boleh kosong');
        }
        const wp = await this.findByNpwp(data.npwp);
        if (!wp) {
            throw new BadRequestException('Wajib Pajak atas NPWP ' + data.npwp + ' tidak ditemukan');
        }
        return this.wpRepository.save(data);
    }

    async delete(npwp: string): Promise<void> {
        const wp = await this.findByNpwp(npwp);
        if (!wp) {
            throw new BadRequestException('Wajib Pajak atas NPWP ' +npwp+ ' tidak ditemukan');
        }
        await this.wpRepository.delete(npwp);
    }


}