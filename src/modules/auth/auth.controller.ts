import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqUser } from '../user/dto/req-user.dto';
import { ReqAuth } from './dto/req-auth.dto';
import { ApiResponse } from 'src/classes/api-reponse.class';
import type { Response } from 'express';
import { COOKIE_KEY } from 'src/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('resignAccount-Auth')
    async resignnAccount(@Body() dto: ReqAuth.ResignDTO) {
        try {
            const res = await this.authService.registerAccount(dto)
            console.log('haha');

            return new ApiResponse(HttpStatus.OK, 'Successfully', res)
        } catch (error) {
            console.log(error);
        }

    }
    @Post('loginAccount-Auth')
    async loginAccount(@Body() dto: ReqAuth.LoginDTO, @Res() res: Response) {
        const result = await this.authService.loginAccount(dto)
        return res.cookie(COOKIE_KEY.REFRESH_TOKEN, result.token.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json(new ApiResponse(HttpStatus.OK, 'Login Successfully', result))
    }
}
