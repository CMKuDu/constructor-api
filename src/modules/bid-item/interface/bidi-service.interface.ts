import { PaginationMeta } from "src/classes/pagination-meta"
import { PaginationResult } from "src/classes/pagination-response.class"
import { ResBidItem } from "../dto/res-bidi.dto"
import { ReqBidItem } from "../dto/req-bidi.dto"
import { BidItems } from "src/Enities/bid-item.entity"
import { DeepPartial } from "typeorm"

export interface IBidIteamService {
    getAll(query: PaginationMeta): Promise<PaginationResult<ResBidItem>>
    getById(dto: ReqBidItem.GetById): Promise<ResBidItem>
    create(dto: ReqBidItem.Create): Promise<ResBidItem>
    update(dto: ReqBidItem.GetById, data: DeepPartial<BidItems>): Promise<ResBidItem>
    remove(dto: ReqBidItem.Remove): Promise<void>
}