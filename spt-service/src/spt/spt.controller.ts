import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { SptService } from './spt.service';
import { Spt } from './spt.entity';
import { CreateSptDto } from './dto/cr-spt.dto';
import { UpdateSptDto } from './dto/up-spt.dto';

@Controller('spt')
export class SptController {
  constructor(private readonly sptService: SptService) {}

  @Get()
  async getAll(): Promise<Spt[]> {
    return await this.sptService.getAll();
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSptDto) {
    return this.sptService.update(id, updateDto);
  } 
}
