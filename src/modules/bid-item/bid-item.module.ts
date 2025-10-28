import { Module } from '@nestjs/common';
import { BidItemService } from './bid-item.service';
import { BidItemController } from './bid-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidItems } from 'src/Enities/bid-item.entity';

@Module({
  providers: [BidItemService],
  controllers: [BidItemController],
  imports: [TypeOrmModule.forFeature([BidItems])],
  exports: [BidItemService]
})
export class BidItemModule { }
