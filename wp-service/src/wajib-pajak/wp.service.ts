import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WajibPajak } from './entity/wp.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { json } from 'stream/consumers';

@Injectable()
export class WajibPajakService {
    constructor(
        @InjectRepository(WajibPajak) private wpRepository: Repository<WajibPajak>,
    ) {}

    async findAll(): Promise<WajibPajak[]> {
        return this.wpRepository.find();
    }

    async findByNpwp(npwp: string): Promise<WajibPajak | null> {
        const wp = this.wpRepository.findOne({ where: { npwp } });
        if (!wp) {
            throw new NotFoundException('Wajib Pajak atas NPWP ' +npwp+ ' tidak ditemukan');
        }
        return wp;
    }

    async create(data: WajibPajak): Promise<WajibPajak> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const wp = await this.findByNpwp(data.npwp);
        if (wp) {
            throw new BadRequestException('Wajib Pajak atas NPWP ' +data.npwp+ ' sudah pernah direkam');
        }
        return this.wpRepository.save(data);
    }

    async update(data: WajibPajak): Promise<WajibPajak> {
        const wp = await this.findByNpwp(data.npwp);
        if (!wp) {
            throw new BadRequestException('Wajib Pajak atas NPWP ' +data.npwp+ ' tidak ditemukan');
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