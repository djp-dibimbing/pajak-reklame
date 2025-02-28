import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spt } from './spt.entity';
import { SptService } from './spt.service';
import { SptController } from './spt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Spt])],
  providers: [SptService],
  controllers: [SptController],
})
export class SptModule {}
