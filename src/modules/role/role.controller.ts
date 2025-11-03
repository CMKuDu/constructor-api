import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { ApiResponse } from 'src/classes/api-reponse.class';
import { ReqRoleDTO } from './dto/req-role.dto';
import { Role } from 'src/Enities/role.entity';

@Controller('role')
export class RoleController {
    constructor(
        protected readonly roleService: RoleService
    ) { }
    @Get('getAll-role')
    async getAll(@Query() query: PaginationMeta) {
        const res = await this.roleService.getAllRole(query);
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Get('getById-role/:id')
    async getByOd(@Param('id', ParseIntPipe) id: number) {
        const res = await this.roleService.getByIdRole({ id: id })
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Post('create-role')
    async createRole(@Body() dto: ReqRoleDTO.createRole) {
        const res = await this.roleService.createRole(dto)
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Put('update-role/:id')
    async updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Role>) {
        const dto = { id } as ReqRoleDTO.updateRole;
        const result = await this.roleService.updateRole(dto, data);
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            result,
        );
    }
    @Delete('remove-role/:id')
    async removeRole(@Param('id', ParseIntPipe) id: number) {
        const res = await this.roleService.removeRole({ id: id })
        return new ApiResponse(
            HttpStatus.OK,
            'Successfully',
            res,
        );
    }
}
