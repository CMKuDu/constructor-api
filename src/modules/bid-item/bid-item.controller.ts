import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BidItemService } from './bid-item.service';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { ApiResponse } from 'src/classes/api-reponse.class';
import { BidItems } from 'src/Enities/bid-item.entity';
import { ReqBidItem } from './dto/req-bidi.dto';

@Controller('bid-item')
export class BidItemController {
    constructor(
        private readonly bidItemService: BidItemService
    ) { }
    @Get('getAll-bidItem')
    async getAll(@Query() query: PaginationMeta) {
        const res = await this.bidItemService.getAll(query);
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Get('getById-bidItem')
    async getByOd(@Param('id', ParseIntPipe) id: number) {
        const res = await this.bidItemService.getById({ id: id })
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Post('create-bidItem')
    async createRole(@Body() dto: ReqBidItem.Create) {
        const res = await this.bidItemService.create(dto)
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Put('update-bidItem/:id')
    async updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<BidItems>) {
        const dto = { id } as ReqBidItem.Update;
        const result = await this.bidItemService.update(dto, data);
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            result,
        );
    }
    @Delete('remove-bidItem/:id')
    async removeRole(@Param('id', ParseIntPipe) id: number) {
        const res = await this.bidItemService.remove({ id: id })
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            res,
        );
    }
}
