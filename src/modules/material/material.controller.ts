import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { MaterialService } from './material.service';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { ReqMaterial } from './dto/req-material.dto';
import { Material } from 'src/Enities/material.entity';
import { ApiResponse } from 'src/classes/api-reponse.class';

@Controller('material')
export class MaterialController {
    constructor(
        private readonly materialService: MaterialService
    ) { }
    @Get('getAll-material')
    async getAll(@Query() query: PaginationMeta) {
        const res = await this.materialService.getAll(query);
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Get('getById-material')
    async getByOd(@Param('id', ParseIntPipe) id: number) {
        const res = await this.materialService.getById({ id: id })
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Post('create-material')
    async createRole(@Body() dto: ReqMaterial.Create) {
        const res = await this.materialService.create(dto)
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Put('update-material/:id')
    async updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Material>) {
        const dto = { id } as ReqMaterial.Update;
        const result = await this.materialService.update(dto, data);
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            result,
        );
    }
    @Delete('remove-material/:id')
    async removeRole(@Param('id', ParseIntPipe) id: number) {
        const res = await this.materialService.remove({ id: id })
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            res,
        );
    }
}
