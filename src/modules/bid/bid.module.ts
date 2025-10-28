import { Module } from '@nestjs/common';
import { BidController } from 'src/modules/bid/bid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bids } from 'src/Enities/bid.entity';
import { User } from 'src/Enities/user.entity';
import { BidItems } from 'src/Enities/bid-item.entity';
import { BidService } from 'src/modules/bid/bid.service';

@Module({
  providers: [BidService],
  controllers: [BidController],
  imports: [TypeOrmModule.forFeature([Bids, User, BidItems])],
  exports: [BidService]
})
export class BidModule { }
