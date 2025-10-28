import { HttpStatus, Injectable } from '@nestjs/common';
import { IBidIteamService } from './interface/bidi-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BidItems } from 'src/Enities/bid-item.entity';
import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { ResBidItem } from './dto/res-bidi.dto';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { paginate, PaginationResult } from 'src/classes/pagination-response.class';
import { ReqBidItem } from './dto/req-bidi.dto';
import { ApiErrorException } from 'src/exceptions/api-reponse.exception';

@Injectable()
export class BidItemService implements IBidIteamService {
    constructor(
        @InjectRepository(BidItems)
        protected readonly bidItemRepository: Repository<BidItems>
    ) { }
    async getAll(query: PaginationMeta): Promise<PaginationResult<ResBidItem>> {
        const where: FindOptionsWhere<BidItems> = {}
        const order: FindOptionsOrder<BidItems> = { id: 'DESC' }
        const result = await paginate(this.bidItemRepository, where, query, {
            order,

        })
        return result
    }
    async getById(dto: ReqBidItem.GetById): Promise<ResBidItem> {
        const result = await this.bidItemRepository.findOne({
            where: { id: dto.id }
        })
        if (!result) {
            throw new ApiErrorException('Not found', HttpStatus.NOT_FOUND)
        }
        return result
    }
    async create(dto: ReqBidItem.Create): Promise<ResBidItem> {
        try {
            const exists = await this.bidItemRepository.findOneBy({
              bidId: dto.bidId,
              materialId: dto.materialId,
            });
            if (exists) {
              throw new ApiErrorException('Bid item already exists', HttpStatus.CONFLICT);
            }

            const newBidItem = this.bidItemRepository.create(dto);

            const saved = await this.bidItemRepository.save(newBidItem);

            if (!saved) {
                throw new ApiErrorException("Can't create BidItem", HttpStatus.BAD_REQUEST);
            }

            return saved;
        } catch (error) {
            console.error(error);
            throw new ApiErrorException(
                error.message || 'Error creating BidItem',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async update(dto: ReqBidItem.GetById, data: DeepPartial<BidItems>): Promise<ResBidItem> {
        const exits = await this.getById({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Not Found', HttpStatus.NOT_FOUND)
        }
        const updated = await this.bidItemRepository.save(
            this.bidItemRepository.merge(exits, data)
        )
        if (!updated) {
            throw new ApiErrorException("Cant't update material", HttpStatus.BAD_REQUEST)
        }
        return updated
    }
    async remove(dto: ReqBidItem.Remove): Promise<void> {
        const exits = await this.getById({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Not Found', HttpStatus.NOT_FOUND)
        }
        const remoed = await this.bidItemRepository.delete(dto.id)
        if (!remoed) {
            throw new ApiErrorException("Can't remove material", HttpStatus.BAD_REQUEST)
        }
    }
}
