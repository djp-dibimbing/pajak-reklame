import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { SptService } from './spt.service';
import { Spt } from './spt.entity';
import { CreateSptDto } from './dto/cr-spt.dto';

@Controller('spt')
export class SptController {
  constructor(private readonly sptService: SptService) {}

  @Get()
  async getAll(): Promise<Spt[]> {
    return await this.sptService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Spt> {
    return await this.sptService.getById(id);
  }

  @Post()
  async create(@Body() createSptDto: CreateSptDto): Promise<Spt> {
    return this.sptService.create(createSptDto);
  }
  
}
