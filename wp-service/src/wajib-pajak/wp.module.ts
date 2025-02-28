import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WajibPajakEntity } from './entity/wp.entity';
import { WajibPajakService } from './wp.service';
import { WajibPajakController } from './wp.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([WajibPajakEntity]),
    HttpModule
  ],
  controllers: [WajibPajakController],
  providers: [WajibPajakService],
  exports: [WajibPajakService]
})

export class WajibPajakModule {}
