import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Spt } from './spt/spt.entity';
import { CreateSptDto } from './spt/dto/cr-spt.dto';
import { UpdateSptDto } from './spt/dto/up-spt.dto';

@Controller('spt')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll(): Promise<Spt[]> {
    return await this.appService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
