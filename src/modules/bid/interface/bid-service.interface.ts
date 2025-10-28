import { PaginationMeta } from "src/classes/pagination-meta"
import { PaginationResult } from "src/classes/pagination-response.class"
import { ReqBid } from "../dto/req-bid.dto"
import { ResBid } from "../dto/res-bid.dto"
import { Bids } from "src/Enities/bid.entity"
import { DeepPartial } from "typeorm"

export interface IBidService {
    getAll(query: PaginationMeta): Promise<PaginationResult<ResBid>>
    getById(dto: ReqBid.GetById): Promise<ResBid>
    create(dto: ReqBid.Create): Promise<ResBid>
    update(dto: ReqBid.GetById, data: DeepPartial<Bids>): Promise<ResBid>
    remove(dto: ReqBid.Delete): Promise<void>
}