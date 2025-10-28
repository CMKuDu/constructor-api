
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/classes/jwt-payload.class';
@Injectable()
export class JwtStrategyPassport extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        // private readonly userService: UserService,
        // private readonly systemUserService: SystemUserService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || '',
        });
    }

    // async validate(payload: JwtPayload) {
    //     try {
    //         // let user: Customer | SystemUser | undefined;

    //         switch (payload.sub.type) {
    //             case ' ': {
    //                 // user = await this.userService.findById(payload.sub.id);
    //                 break;
    //             }
    //             case 'system': {
    //                 user = await this.systemUserService.findById(
    //                     payload.sub.id,
    //                 );
    //                 break;
    //             }
    //             default: {
    //                 break;
    //             }
    //         }

    //         if (!user) {
    //             throw new ApiErrorException(
    //                 'Unauthorized',
    //                 HttpStatus.UNAUTHORIZED,
    //             );
    //         }
    //         return user;
    //     } catch (error) {
    //         console.error('JWT error', error);
    //     }
    // }
}