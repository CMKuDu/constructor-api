import { HttpStatus, Injectable } from '@nestjs/common';
import { IBidService } from 'src/modules/bid/interface/bid-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Bids, BidStatus } from 'src/Enities/bid.entity';
import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { paginate, PaginationResult } from 'src/classes/pagination-response.class';
import { ResBid } from './dto/res-bid.dto';
import { ReqBid } from './dto/req-bid.dto';
import { ApiErrorException } from 'src/exceptions/api-reponse.exception';
import { User } from 'src/Enities/user.entity';
import { BidItems } from 'src/Enities/bid-item.entity';

@Injectable()
export class BidService implements IBidService {
    constructor(
        @InjectRepository(Bids)
        protected readonly bidRepository: Repository<Bids>,
        @InjectRepository(User)
        protected readonly userRepository: Repository<User>,
        @InjectRepository(BidItems)
        protected readonly bidItemRepository: Repository<BidItems>,
    ) { }
    async getAll(query: PaginationMeta): Promise<PaginationResult<ResBid>> {
        const where: FindOptionsWhere<Bids> = {}
        const order: FindOptionsOrder<Bids> = { id: 'DESC' }
        const result = await paginate(this.bidRepository, where, query, {
            order,

        })
        return result
    }
    async getById(dto: ReqBid.GetById): Promise<ResBid> {
        const result = await this.bidRepository.findOne({
            where: { id: dto.id }
        })
        if (!result) {
            throw new ApiErrorException('Not found', HttpStatus.NOT_FOUND)
        }
        return result
    }
    async create(dto: ReqBid.Create): Promise<ResBid> {
        const user = await this.userRepository.findOneBy({ id: dto.userId });
        if (!user) {
            throw new ApiErrorException('User not found', HttpStatus.NOT_FOUND);
        }
        const exits = await this.bidRepository.findOneBy({ projectName: dto.projectName })
        if (exits) {
            throw new ApiErrorException('Already extis', HttpStatus.CONFLICT)
        }
        const dossierCode = dto.dossierCode || `BID-${Date.now()}`;
        const bid = this.bidRepository.create({
            ...dto,
            dossierCode,
            user,
            status: dto.status || BidStatus.DRAFT,
            bidItems: dto.bidItems || [],
        });
        const saved = await this.bidRepository.save(bid)
        if (!saved) {
            throw new ApiErrorException("Cant't create Bid", HttpStatus.BAD_REQUEST)
        }
        return saved
    }
    async update(dto: ReqBid.GetById, data: DeepPartial<Bids>): Promise<ResBid> {
        const exits = await this.getById({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Not Found', HttpStatus.NOT_FOUND)
        }
        const updated = await this.bidRepository.save(
            this.bidRepository.merge(exits, data)
        )
        if (!updated) {
            throw new ApiErrorException("Cant't update material", HttpStatus.BAD_REQUEST)
        }
        return updated
    }
    async remove(dto: ReqBid.Delete): Promise<void> {
        const exits = await this.getById({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Not Found', HttpStatus.NOT_FOUND)
        }
        const remoed = await this.bidRepository.delete(dto.id)
        if (!remoed) {
            throw new ApiErrorException("Can't remove material", HttpStatus.BAD_REQUEST)
        }
    }
}
