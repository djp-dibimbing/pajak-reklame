import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WajibPajakModule } from './wajib-pajak/wp.module';
import { WajibPajakEntity } from './wajib-pajak/entity/wp.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [WajibPajakEntity],
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      logging: true,
    }),
    HttpModule,
    WajibPajakModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
