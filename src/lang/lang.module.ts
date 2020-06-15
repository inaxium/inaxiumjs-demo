import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';
import { Lang } from './lang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lang])],
  providers: [LangService],
  controllers: [LangController],
})
export class LangModule {}