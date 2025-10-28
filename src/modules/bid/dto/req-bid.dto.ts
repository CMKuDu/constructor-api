import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BidStatus } from "src/Enities/bid.entity";
import { ReqBidItem } from "src/modules/bid-item/dto/req-bidi.dto";
import { Column } from "typeorm";

export namespace ReqBid {
    export class Create {
        @IsNumber()
        userId: number;

        @IsOptional()
        @IsString()
        dossierCode?: string;

        @IsString()
        projectName: string;

        @IsOptional()
        @IsString()
        packageName?: string;

        @IsOptional()
        @IsString()
        biddingUnit?: string;

        @IsOptional()
        openingDate?: Date;

        @IsOptional()
        closingDate?: Date;

        @IsOptional()
        @IsString()
        biddingMethod?: string;

        @IsOptional()
        @IsString()
        implementationLocation?: string;

        @IsOptional()
        @IsString()
        fundingSource?: string;

        @Column({
            type: 'enum',
            enum: BidStatus,
            default: 'DRAFT',
        })
        status?: string;

        @IsOptional()
        totalBidValue?: number;

        @IsOptional()
        @IsString()
        notes?: string;

        // ✅ Cho phép gửi danh sách BidItems từ FE xuống
        @IsOptional()
        @IsArray()
        @ValidateNested({ each: true })
        @Type(() => ReqBidItem.Create)
        bidItems?: ReqBidItem.Create[];
    }
    export class Update {
        id: number
    }
    export class GetById {
        id: number
    }
    export class GetByName {
        name: string
    }
    export class Delete {
        id: number
    }

}