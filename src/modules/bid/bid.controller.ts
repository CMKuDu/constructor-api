import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BidService } from './bid.service';
import { ApiResponse } from 'src/classes/api-reponse.class';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { ReqBid } from './dto/req-bid.dto';
import { Bids } from 'src/Enities/bid.entity';

@Controller('bid')
export class BidController {
    constructor(
        protected readonly bidService: BidService
    ) { }
    @Get('getAll-bid')
    async getAll(@Query() query: PaginationMeta) {
        const res = await this.bidService.getAll(query);
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Get('getById-bid')
    async getByOd(@Param('id', ParseIntPipe) id: number) {
        const res = await this.bidService.getById({ id: id })
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Post('create-bid')
    async createRole(@Body() dto: ReqBid.Create) {
        const res = await this.bidService.create(dto)
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Put('update-bid/:id')
    async updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Bids>) {
        const dto = { id } as ReqBid.Update;
        const result = await this.bidService.update(dto, data);
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            result,
        );
    }
    @Delete('remove-bid/:id')
    async removeRole(@Param('id', ParseIntPipe) id: number) {
        const res = await this.bidService.remove({ id: id })
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            res,
        );
    }
}
