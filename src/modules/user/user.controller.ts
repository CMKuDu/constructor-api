import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { ApiResponse } from 'src/classes/api-reponse.class';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }
    @Get('getAll-user')
    async getAllUser(@Query() query: PaginationMeta) {
        const res = await this.userService.getAllUser(query);
        return new ApiResponse(
            HttpStatus.OK,
            'Get all User Successfully',
            res
        );
    }
    @Get('getById-user/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const res = await this.userService.getUserById({ id: id })
        return new ApiResponse(
            HttpStatus.OK,
            'Get User by id Successfully',
            res,
        );
    }
    @Get('get-user-by-email/:email')
    async getUserByEmail(@Param('email') email: string) {
        const res = await this.userService.getUserByEmail({ email: email });
        return new ApiResponse(
            HttpStatus.OK,
            'Get User by email Successfully',
            res,
        );
    }
}
