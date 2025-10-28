import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqUser } from '../user/dto/req-user.dto';
import { ReqAuth } from './dto/req-auth.dto';
import { ApiResponse } from 'src/classes/api-reponse.class';
import type { Response } from 'express';
import { COOKIE_KEY } from 'src/constants';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('resignAccount-Auth')
    async resignnAccount(@Body() dto: ReqAuth.ResignDTO) {
        const res = await this.authService.registerAccount(dto)
        return new ApiResponse(HttpStatus.OK, 'Successfully', res)
    }
    @Post('loginAccount-Auth')
    async loginAccount(@Body() dto: ReqAuth.LoginDTO, @Res() res: Response) {
        const result = await this.authService.loginAccount(dto)
        return res.cookie(COOKIE_KEY.REFRESH_TOKEN, result.token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json(new ApiResponse(HttpStatus.OK, 'Login Successfully', result))
    }
}
