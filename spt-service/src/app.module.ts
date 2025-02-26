import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Spt } from './spt/spt.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      password: 'ymMkIXZiA2Cd6b3a',
      username: 'postgres.davihfzltwxyvklvtjpb',
      database: 'postgres',
      entities: [Spt],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Spt]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}