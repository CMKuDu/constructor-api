import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/Enities/material.entity';

@Module({
  providers: [MaterialService],
  controllers: [MaterialController],
  imports: [TypeOrmModule.forFeature([Material])],
  exports: [MaterialService]
})
export class MaterialModule { }
