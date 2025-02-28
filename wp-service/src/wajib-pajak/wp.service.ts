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
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { TransactionLogModel } from 'src/transaction-log/tranasaction-log.model';
import * as moment from 'moment';

@Injectable()
export class WajibPajakService {
    constructor(
        @InjectRepository(WajibPajakEntity) 
        private wpRepository: Repository<WajibPajakEntity>,
        private readonly httpService: HttpService,
    ) {}

    async findAll(): Promise<WajibPajakEntity[]> {
        const tlm = new TransactionLogModel();
        tlm.activity = 'create';
        tlm.data = JSON.stringify('get all wp');
        tlm.user = 'admin';
        tlm.id = moment().format('YYYYMMDDHHmmss');
        await this.sendToLog(tlm);
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
        const savedWp = await this.wpRepository.save(data);
        const tlm = new TransactionLogModel();
        tlm.activity = 'create';
        tlm.data = JSON.stringify(data);
        tlm.user = data.npwp;
        tlm.id = moment().format('YYYYMMDDHHmmss');
        await this.sendToLog(tlm);
        return savedWp;
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

    async sendToLog(tlm: TransactionLogModel): Promise<AxiosResponse> {
        return this.httpService.axiosRef
          .post(`http://localhost:3004/transaction-log`, tlm)
          .then((res) => res.data)
          .catch((err) => {
            throw new Error(
              err?.message + ': ' + JSON.stringify(err?.response?.data),
            );
          });
      }


}